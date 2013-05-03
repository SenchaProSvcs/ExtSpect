Ext.define('uxExtSpect.view.object.ObjectNavigationView', {
	extend: 'uxExtSpect.view.ExtSpectNavigationView',
	xtype: 'objectnavigationview',
	id: 'es-objectnavigationview',
	dataListStoreName: 'uxExtSpect.store.object.property.PropertiesListStore',

	requires: [ 'uxExtSpect.view.object.tabpanel.ArrayTabPanel',
			'uxExtSpect.view.object.tabpanel.CollectionTabPanel',
			'uxExtSpect.view.object.tabpanel.MixedCollectionTabPanel',
			'uxExtSpect.view.object.tabpanel.ExtObjectTabPanel' ],

	showOnlyOwnProperties: false,

	config: {
		items: [ {
			xtype: 'extobjecttabpanel'
		} ]
	},

	// called by ObjectNavigationView#onBackButtonTap()
	// p. 4-36 Touch manual says this is needed
	// or use autoDestroy: true
	/*
	 * pop : function ( ) { // var currentTabPanel = this._activeItem
	 * this.callParent( arguments ) // currentTabPanel.destroy() // it is
	 * sufficient to make sure // the parent method gets called // TODO: Should
	 * refresh/update the current tree view // by resetting the data in the
	 * store } ,
	 */

	canDrillDown: function(newObject) {
		if (newObject instanceof RegExp) {
			return false;
		}

		if (uxExtSpect.util.StringOf.propertyCount(newObject) === 0) {
			return false;
		}

		// TODO: BUGGY
		// if ( newObject === this.getRootObject() )
		// { return false }
		return true;
	},

	computeTitleString: function(object) {
		var titleWidthInChars = this.getWidth() / 13;
		return Ext.String.ellipsis(uxExtSpect.util.StringOf.to$(object), titleWidthInChars, true);
	},

	setStartObject: function(startObject) {
		this.setRootObject(startObject);

		var tabPanel = this.down('extobjecttabpanel');
		tabPanel.setRootObject(startObject);

		var navigationBar = this.getNavigationBar();
		var titleComponent = navigationBar.titleComponent;

		var title = this.computeTitleString(startObject);
		// The 2 lines below do not blow up, but seem to have little effect
		navigationBar.setTitle(title);
		tabPanel.setTitle(title);

		// Below works for startup, but the title is no longer there when you
		// click the back button
		titleComponent.setTitle(title);
	},

	pushNewPropertiesPanel: function(newObject) {
		if (this.canDrillDown(newObject)) {
			this.setRootObject(newObject);

			var title = this.computeTitleString(newObject);

			var tabPanelString = (newObject instanceof Ext.Base) ? 'uxExtSpect.view.object.tabpanel.ExtObjectTabPanel'
					: 'uxExtSpect.view.object.tabpanel.InstanceTabPanel';
			var tabPanel = Ext.create(tabPanelString);

			tabPanel.setRootObject(newObject);
			this.push({
				title: title,
				items: tabPanel,
				layout: 'card'
			});

			var treeNavigationView = uxExtSpect.instance.fetchTreeNavigationView();
			treeNavigationView.selectNewObject(newObject);

			// TODO: Should refresh/update the current tree view
			// by resetting the data in the store
		}
	},

	// push a new array list into the navigation view
	pushNewArrayPanel: function(array, previousProperty, previousTabPanel, panelClass) {
		if (array.length === 0) {
			return;
		}

		if ((array.length === 1) && (array[0] instanceof Object)) {
			this.pushNewPropertiesPanel(array[0]);
		} else {
			var previousObject = previousTabPanel.fetchRootObject();
			var pointer = Ext.create('uxExtSpect.object.pointer.PropertyPointer', {});
			pointer.object = previousObject;
			pointer.property = previousProperty;
			this.setRootObject(pointer);

			var newTabPanel = Ext.create(panelClass || 'uxExtSpect.view.object.tabpanel.ArrayTabPanel');
			newTabPanel.setRootObject(pointer);

			// TODO: If you are drilling down thru an array of arrays, title$
			// might be wrong!
			var title = pointer.extspectString();
			this.push({
				title: title,
				items: [ newTabPanel ],
				layout: 'card'
			});

			// TODO: Should refresh/update the current tree view
			// by resetting the data in the store
		}
	}
});
