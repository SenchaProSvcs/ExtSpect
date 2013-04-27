Ext.define( 'uxExtSpect.view.object.button.show.AllPropsButton',
	{  extend : 'uxExtSpect.view.object.button.PropertiesListToolbarButton',
		xtype : 'allpropertiesbutton',
		config : {
			text : 'All',
			pressed : true,
			handler : function () { this.showAllProperties(); }
		}
	}
);
