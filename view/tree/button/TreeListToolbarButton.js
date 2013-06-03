Ext.define( 'uxExtSpect.view.tree.button.TreeListToolbarButton',
	{   extend: 'uxExtSpect.view.ExtSpectToolbarButton',

		showInstances: function () {
			this.fetchParentNavigationView().showInstances = true;
			this.fetchDataList().computeAndSetData();
		},

		showClassesOnly: function () {
			this.fetchParentNavigationView().showInstances = false;
			this.fetchDataList().computeAndSetData();
		},

		showContainersOnly: function () {
			this.fetchParentNavigationView().showComponents = false;
			this.fetchDataList().computeAndSetData();
		},

		showAllComponents: function () {
			this.fetchParentNavigationView().showComponents = true;
			this.fetchDataList().computeAndSetData();
		},

//		showListing: function () {
//			var tree = this.fetchDataList();
//			tree.setPresentationMode( 'list' );
//			var navigationView = this.fetchParentNavigationView();
//			navigationView.dataListStoreName = 'uxExtSpect.store.tree.ListingStore';
//			tree.computeAndSetData();
//		},

//		setItemClassForDataLists: function ( navigationView, value ) {
//			console.log( arguments.callee.displayName );
//			var dataLists = navigationView.fetchDataLists();
//			for ( var index = 0, len = dataLists.length; index < len; index ++ ) {
//				dataLists[index].setItemCls( value );
//			}
//		},

		showIndented: function () {
			var tree = this.fetchDataList();
			tree.setPresentationMode( 'indented' );

			// tree.setItemCls( 'es-indent-item-cls' );

			var navigationView = this.fetchParentNavigationView();
			navigationView.dataListStoreName = 'uxExtSpect.store.tree.TreeListStore';

			tree.computeAndSetData();
		},

		showTree: function () {
			var tree = this.fetchDataList();
			tree.setPresentationMode( 'tree' );

			// tree.setItemCls( 'es-tree-item-cls' );

			var navigationView = this.fetchParentNavigationView();
			navigationView.dataListStoreName = 'uxExtSpect.store.tree.TreeListStore';

			tree.computeAndSetData();
		}
	}
);
