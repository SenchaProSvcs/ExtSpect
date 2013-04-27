Ext.define( 'uxExtSpect.view.object.button.show.OwnPropsButton',
	{  extend : 'uxExtSpect.view.object.button.PropertiesListToolbarButton',
		xtype : 'ownpropertiesbutton',
		config : {    text : 'Own Properties',
			handler : function () { this.showOwnProperties(); }
		}
	}
);
