Ext.define( 'uxExtSpect.view.object.datalist.property.InternalList',
	{  extend: 'uxExtSpect.view.object.datalist.property.PropertiesList',
		xtype: 'internallist',
		requires: 'uxExtSpect.store.object.property.InternalListStore',
		config: { indexBar: false },

		storeName: 'uxExtSpect.store.object.property.InternalListStore',

		determineStoreName: function () {
			var storeName = this.getGrouped() ?
				this.fetchParentNavigationView().dataListStoreName :
				this.storeName;
			return storeName;
		},

		isValueOk: function ( value, property ) { return this.isInternalPropertyName( property ); },

		determinePropertyGroup: function ( property ) {
			if ( ( property.search( 'WIDTH' ) !== - 1 ) ||
				( property.search( 'HEIGHT' ) !== - 1 )
				) { return '= BOX ='; }

			if ( ( property.search( 'LEFT' ) !== - 1 ) ||
				( property.search( 'TOP' ) !== - 1 ) ||
				( property.search( 'RIGHT' ) !== - 1 ) ||
				( property.search( 'BOTTOM' ) !== - 1 )
				) { return '= POSITION ='; }

			if ( ( property.search( 'LANSCAPE' ) !== - 1 ) ||
				( property.search( 'PORTRAIT' ) !== - 1 )
				) { return '= ORIENTATION ='; }

			return this.callParent( arguments );
		}
	}
);
