Ext.define( 'uxExtSpect.view.ExtSpectToolbarButton',
	{  extend : 'Ext.Button',
		defaultIdPrefix : 'es-',

		fetchParentNavigationView : function () {
			var panel = this.up( '[isExtSpectNavigationView]' );
			if ( !panel )
			{ console.error( 'ExtSpectToolbarButton#fetchParentNavigationView, this = ', this ); }
			return panel;
		},

		fetchDataList : function () {
			var toolbar = this.up( '[isExtSpectToolbar]' );
			var dataList = toolbar.getParent().getInnerItems()[ 0 ];
			if ( !dataList.isExtSpectDataList )
			{ console.error( 'ExtSpectToolbarButton#fetchDataList says this is not an isExtSpectDataList : ', this ); }
			return dataList;
		}
	}
);
