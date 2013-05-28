Ext.define( 'uxExtSpect.view.tree.TreeNavigationView', {
	extend: 'uxExtSpect.view.ExtSpectNavigationView',
	xtype: 'treenavigationview',
	id: 'es-treenavigationview',
	requires: ['uxExtSpect.view.tree.tabpanel.TreeTabPanel'],
	dataListStoreName: 'uxExtSpect.store.tree.TreeListStore',

	showListing: false,
	showComponents: false,
	showInstances: false,

	config: {
		items: [
			{ xtype: 'treetabpanel' }
		]
	},

	fetchDataLists: function () {
		return this.query( '[isExtSpectDataList=true]' );
	},

	// A new object has appeared in the Object view
	// Try to select it on the datalist in the tree
	selectNewObject: function ( value ) {
		var dataLists = this.fetchDataLists();
		for ( var index = 0, len = dataLists.length; index < len; index ++ ) {
			dataLists[index].selectValue( value );
		}
	}
} );
