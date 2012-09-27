Ext.define( 'extspect.view.object.button.show.AllPropsButton',
	{  extend : 'extspect.view.object.button.PropertiesListToolbarButton',
		xtype : 'allpropertiesbutton',
		config : {
			text : 'All',
			pressed : true,
			handler : function () { this.showAllProperties(); }
		}
	}
);
