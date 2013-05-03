Ext.define( 'uxExtSpect.view.tree.TreeNavigationView', {
	extend: 'uxExtSpect.view.ExtSpectNavigationView',
	xtype: 'treenavigationview',
	id: 'es-treenavigationview',
	requires: [ 'uxExtSpect.view.tree.tabpanel.TreeTabPanel' ],
	dataListStoreName: 'uxExtSpect.store.tree.TreeListStore',

	showListing: false,
	showListeners: false,
	showInstances: true,

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
	selectNewObject: function ( newObject ) {
		// console.log( arguments.callee.displayName, "newObject=", newObject );
		var dataLists = this.fetchDataLists();
		for ( var index = 0, len = dataLists.length; index < len; index++ ) {
			var dataList = dataLists[index];
			var store = dataList.getStore();
			if ( store ) { // a list that is not visible mght not have a store
				var record = store.findRecord( "text", uxExtSpect.util.StringOf.to$( newObject ), 0, true );
				if ( record ) {
					dataList.deselectAll();
					dataList.select( record, false );
				}
			}
		}
	}
} );
