// dataview List explained p. 4-31

Ext.define( 'uxExtSpect.view.object.datalist.PropertiesOrArrayList',
	{  extend: 'uxExtSpect.view.ExtSpectDataList',

		config: {
			indexBar: true, // Ext.IndexBar
			// TODO: indexBar should only be true if more than 10 items

			// itemCls: 'es-properties-list-item-cls',

			itemTpl:
				'<b>{id}</b>: {text}'
		},

		determineAndSetIndexBar: function () {
			var groupedOk = this.isGroupedOk();
			this.setGrouped( groupedOk );
			// determineStoreName() depends on this.getGrouped()

			// We do not use the indexBar for groups because the
			// groupings by datatype follow at the bottom in lowercase.
			this.setIndexBar( ! groupedOk );

			// this.callParent( arguments )
		},

		createRowObject: function ( value, id, object ) {
			var string = this.valueStringOf( value );
			if ( object && object.hasOwnProperty( id ) ) {
				string = '<b>' + string + '</b>';
			}
			return { id: id, value: value, text: string };
		},

		// TODO: arg list for onItemDisclosure is WRONG in doc, BUG
		handleItemSingleTap: function ( dataview, index, element, record ) {
			var value = record.data.value;

			var id = record.data.id;
			var navigationView = this.up( 'objectnavigationview' );
			var parentTabPanel = this.fetchParentTabPanel();

			if ( ( value instanceof Ext.util.MixedCollection ) || ( value instanceof Ext.util.HashMap ) ) {
				value = this.extCollectionToArray( value );
				navigationView.pushNewArrayPanel( value, id, parentTabPanel,
					'uxExtSpect.view.object.tabpanel.MixedCollectionTabPanel' );
			}
			else {
				if ( value instanceof Ext.util.Collection ) {
					navigationView.pushNewArrayPanel( value, id, parentTabPanel,
						'uxExtSpect.view.object.tabpanel.CollectionTabPanel' );
				}
				else {
					if ( value instanceof Array ) {
						navigationView.pushNewArrayPanel( value, id, parentTabPanel );
					}
					else {
						if ( value instanceof Object ) {
							navigationView.pushNewPropertiesPanel( value );
						}
					}
				}
			}
		}
	} );
