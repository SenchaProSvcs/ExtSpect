Ext.define( 'ux.extspect.view.object.button.show.AllPropsButton',
	{  extend : 'ux.extspect.view.object.button.PropertiesListToolbarButton',
		xtype : 'allpropertiesbutton',
		config : {
			text : 'All',
			pressed : true,
			handler : function () { this.showAllProperties(); }
		}
	}
);
