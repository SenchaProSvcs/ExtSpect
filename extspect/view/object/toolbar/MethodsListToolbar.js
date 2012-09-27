Ext.define( 'extspect.view.object.toolbar.MethodsListToolbar',
	{    extend : 'extspect.view.ExtSpectToolbar',
		xtype : 'methodslisttoolbar',

		requires : [
			'extspect.view.object.button.show.AllPropsButton' ,
			'extspect.view.object.button.show.OwnPropsButton' ,
			'extspect.view.object.button.sort.AlphaButton' ,
			'extspect.view.object.button.sort.GroupButton'
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
