Ext.define( 'uxExtSpect.view.object.button.PropertiesListToolbarButton',
	{  extend : 'uxExtSpect.view.ExtSpectToolbarButton',

		showAllProperties : function () {
			this.fetchParentNavigationView().showOnlyOwnProperties = false;
			this.fetchDataList().computeAndSetData();
		},

		showOwnProperties : function () {
			this.fetchParentNavigationView().showOnlyOwnProperties = true;
			this.fetchDataList().computeAndSetData();
		},

		sortByGroup : function () {
			var navigationView = this.fetchParentNavigationView();
			navigationView.isDataListGrouped = true;
			navigationView.dataListStoreName =
				'uxExtSpect.store.object.property.GroupedPropertiesListStore';
			this.fetchDataList().computeAndSetData();
		},

		sortAlphabetically : function () {
			var navigationView = this.fetchParentNavigationView();
			navigationView.isDataListGrouped = false;
			navigationView.dataListStoreName = 'uxExtSpect.store.object.property.PropertiesListStore';
			this.fetchDataList().computeAndSetData();
		}
	}
);
