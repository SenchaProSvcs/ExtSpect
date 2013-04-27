Ext.define( 'uxExtSpect.view.object.toolbar.MethodsListToolbar',
	{  extend : 'uxExtSpect.view.ExtSpectToolbar',
		xtype : 'methodslisttoolbar',

		requires : [
			'uxExtSpect.view.object.button.show.AllPropsButton' ,
			'uxExtSpect.view.object.button.show.OwnPropsButton' ,
			'uxExtSpect.view.object.button.sort.AlphaButton' ,
			'uxExtSpect.view.object.button.sort.GroupButton'
		],

		config : {    // minWidth : '300' , // BUG: this should not be necessary
			items : [
				/*{	xtype : 'segmentedbutton' ,
				 items :
				 [	{	xtype : 'alphabutton' } ,
				 {	xtype : 'groupbutton' }
				 ]
				 } ,
				 {	xtype : 'spacer' ,
				 width : 20
				 } , */
				{    xtype : 'segmentedbutton',
					items : [
						{    xtype : 'ownpropertiesbutton' } ,
						{    xtype : 'allpropertiesbutton' }
					]
				}
			]
		}
	}
);
