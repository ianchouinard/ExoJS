class ExoJS {

	constructor(appId) {
		this.appId = appId;
		this.component = null;
		this.model = {};
		this.templates = {};
	}

	onRegister() {
		/* PASS */
	}

	onReady() {
		/* PASS */
	}

	attach() {
	this.component = document.querySelector(`[data-exo-component="${this.appId}"]`);

		if (!this.component) {
			return;
		}

		this.onRegister();

		this.bindData();
		this.bindEvents();
		this.bindIterables();
		this.bindConditionals(this.component.querySelectorAll('[data-if]'), 'data-if');
		this.onReady();
	}

	bindData() {
		const modelAttributes = this.component.querySelectorAll('[data-model]');
		modelAttributes.forEach((attribute) => {
			this.model[attribute.getAttribute('data-model')] = this.bindItem(attribute);
		});
	}

	bindItem(attribute) {
		let output;

		switch (attribute.tagName) {
			case 'INPUT':
				output = this.bindInputValue(attribute);
				break;

			case 'SELECT':
				output = attribute.value;
				break;

			case 'TEXTAREA':
				output = attribute.value;
				break;

			default:
				output = this.bindNormalValue(attribute);
				break;
		}

		return output;
	}

	bindNormalValue(attribute) {
		const type = attribute.getAttribute('data-type');
		let value = attribute.textContent;

		if (type && type === 'int') {
			value = parseFloat(value);
		}

		if (type && type === 'string') {
			value = value + '';
		}

		return value;
	}

	bindInputValue(attribute) {
		const type = attribute.getAttribute('type') + '';
		let value;

		if (type.toLowerCase() === 'checkbox') {
			value = attribute.checked;
		} else {
			value = attribute.value;
		}

		return value;
	}

	bindEvents() {
		const eventAttributes = this.component.querySelectorAll('[data-action]');
		eventAttributes.forEach((attribute) => {
			this.bindEvent(attribute);
		});
	}

	bindEvent(attribute, item, itemIndex) {
		const action = attribute.getAttribute('data-action').split(':');
		const trigger = action[0];
		const method = action[1];

		attribute[trigger] = (e) => {
			this[method](e, item, itemIndex);
		};
	}

	bindConditionals(ifAttributes, attributeKey, iterableIndex) {
		ifAttributes.forEach((attribute) => {
			let property = attribute.getAttribute(attributeKey);
			let isPositive = true;

			if (!property) {
				return;
			}

			let childKey;

			if (property.indexOf(':') >= 0) {
				childKey = property.split(':')[1] || '';
				property = property.split(':')[0] || '';
			}

			if (property.charAt(0) === '!') {
				isPositive = false;
				property = property.substring(1);
			}

			let item = this.model[property];

			if (childKey && iterableIndex !== null && iterableIndex !== undefined) {
				item = item[iterableIndex];
				item = item[childKey];
			}

			if (item !== null && item !== undefined) {
				attribute.style.display = item === isPositive ? null : 'none';
			}

		});
	}

	bindIterables() {
		const iterables = this.component.querySelectorAll('[data-foreach]');

		iterables.forEach((iterable) => {
			const property = iterable.getAttribute('data-foreach');
			this.model[property] = [];

			const children = iterable.querySelectorAll(`[data-item-for="${property}"]`);

			children.forEach((child, childIndex) => {
				const childData = {};
				const childProperties = child.querySelectorAll('[data-model-for]');
				const childActions = child.querySelectorAll('[data-action]');

				childProperties.forEach((childProperty) => {
					const attributeKey = childProperty.getAttribute('data-model-for') + '';
					const keys = attributeKey.split(':');

					if (keys[0] === property) {
						childData[keys[1]] = this.bindItem(childProperty);
					}
				});

				this.model[property].push(childData);

				childActions.forEach((action) => {
					this.bindEvent(action, this.model[property][childIndex], childIndex)
				});

				this.bindConditionals(child.querySelectorAll('[data-if-for]'), 'data-if-for', childIndex);
			});
		});
	}

	registerIterableTemplate(property, template) {
		this.templates[property] = template;
	}

	update(property) {
		const modelProperty = this.model[property];

		if (modelProperty === undefined) {
			return;
		}

		if (Array.isArray(modelProperty)) {
			this.updateIterableNode(property);
		} else {
			this.updateSingleNode(property);
		}
	}

	updateSingleNode(property) {
		const propertyNodes = this.component.querySelectorAll(`[data-model="${property}"]`);
		const value = this.model[property];

		propertyNodes.forEach((propertyNode) => {
			switch (propertyNode.tagName) {
				case 'INPUT':
					const type = (propertyNode.getAttribute('type') + '').toLowerCase();
					if (type === 'checkbox') {
						propertyNode.checked = value;
					} else {
						propertyNode.value = value;
					}
					break;

				case 'SELECT':
					propertyNode.value = value;
					break;

				case 'TEXTAREA':
					propertyNode.value = value;
					break;

				default:
					propertyNode.textContent = value;
					break;
			}
		});

		this.bindConditionals(this.component.querySelectorAll('[data-if]'), 'data-if');
	}

	updateIterableNode(property) {
		const modelList = this.model[property];
		const listNode = this.component.querySelectorAll(`[data-foreach="${property}"]`);

		if (!listNode || !listNode.length || !modelList) {
			return;
		}

		const template = this.templates[property];

		if (!template) {
			console.error('ExoJS: A template must be registered to update a list');
			return;
		}

		let itemsRender = '';
		modelList.forEach((item) => {
			itemsRender += template(item);
		});

		listNode.forEach((list) => {
			list.innerHTML = itemsRender;
		});

		this.bindIterables();
	}

}

window.ExoJS = ExoJS;
