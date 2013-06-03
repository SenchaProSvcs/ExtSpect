Ext.define( 'uxExtSpect.view.object.toolbar.PropertiesListToolbar',
	{  extend: 'uxExtSpect.view.ExtSpectToolbar',
		xtype: 'propertieslisttoolbar',

		requires: [
			'uxExtSpect.view.object.button.show.AllPropsButton' ,
			'uxExtSpect.view.object.button.show.OwnPropsButton' ,
			'uxExtSpect.view.object.button.sort.AlphaButton' ,
			'uxExtSpect.view.object.button.sort.GroupButton'
		],

		config: {
			items: [
				{  xtype: 'segmentedbutton',
					items: [
						{  xtype: 'ownpropertiesbutton' } ,
						{  xtype: 'allpropertiesbutton' }
					]
				}
			]
		},

		initialize: function () {
			if ( ! Ext.dataview.component.ListItem ) { // Ext.version.version === '2.0.1.1'
				this.add(
					Ext.createByAlias( 'widget.spacer', { width: 20 } ) );
				this.add(
					Ext.createByAlias( 'widget.segmentedbutton',
						{  xtype: 'segmentedbutton',
							items: [
								{  xtype: 'alphabutton',
									pressed: true
								} ,
								{  xtype: 'groupbutton' }
							]
						}
					)
				)
			}
		}
	}
);
