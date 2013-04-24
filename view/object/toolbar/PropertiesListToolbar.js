Ext.define( 'ux.extspect.view.object.toolbar.PropertiesListToolbar',
	{  extend : 'ux.extspect.view.ExtSpectToolbar',
		xtype : 'propertieslisttoolbar',

		requires : [
			'ux.extspect.view.object.button.show.AllPropsButton' ,
			'ux.extspect.view.object.button.show.OwnPropsButton' ,
			'ux.extspect.view.object.button.sort.AlphaButton' ,
			'ux.extspect.view.object.button.sort.GroupButton'
		],

		config : {    minWidth : '300', // BUG: this should not be necessary
			items : [
				{  xtype : 'segmentedbutton',
					items : [
						{    xtype : 'alphabutton' } ,
						{    xtype : 'groupbutton' }
					]
				} ,
				{  xtype : 'spacer',
					width : 20
				} ,
				{  xtype : 'segmentedbutton',
					items : [
						{  xtype : 'ownpropertiesbutton' } ,
						{  xtype : 'allpropertiesbutton' }
					]
				}
			]
		}
	}
);
