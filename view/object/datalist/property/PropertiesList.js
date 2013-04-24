Ext.define( 'ux.extspect.view.object.datalist.property.PropertiesList',
	{  extend : 'ux.extspect.view.object.datalist.PropertiesOrArrayList',
		xtype : 'propertieslist',
		requires : [
			'ux.extspect.store.object.property.PropertiesListStore' ,
			'ux.extspect.store.object.property.GroupedPropertiesListStore'
		],
		storeName : null,

		isValueOk : function ( value, property ) {
			return !( ( value instanceof Function ) ||
				( this.isInternalPropertyName( property ) )
				);
		},

		firstSixCharsAreUpperCase : function ( string ) {
			var len = string.length;
			if ( len > 6 ) { len = 6; }
			for ( var index = 0; index < len; index++ )
			{  var code = string.charCodeAt( index );
				if ( ( ( code < 65 ) || ( code > 90 ) ) &&
					( code !== 0x5f ) ) // underscore
				{ return false; }
			}
			return true;
		},

		isInternalPropertyName : function ( property ) {
			return    ( property.charAt( 0 ) === '_' ) ||
				this.firstSixCharsAreUpperCase( property );
		},

		isCollectionValue : function ( value ) {
			return    (    (    value instanceof Array ) ||
				(    value instanceof Ext.util.AbstractMixedCollection )
				);
		},

		determineCollectionGroup : function ( value, property ) {
			return '= collection =';
		},

		determineObjectGroup : function ( value, property ) {
			if ( value instanceof Function ) { return '= function ='; }
			if ( value instanceof RegExp ) { return '= regular expression ='; }
			if ( value instanceof Date ) { return '= date ='; }
			if ( value instanceof String ) { return '= string ='; }
			if ( value instanceof Boolean ) { return '= boolean ='; }
			if ( value === null ) { return '= undefined ='; }
			if ( value === undefined ) { return '= undefined ='; }
			return '= unclassified =';
		},

		determineItemGroup : function ( value, property ) {
			if ( value === null ) { return '= undefined ='; }
			if ( value === undefined ) { return '= undefined ='; }
			return '= ' + typeof( value ) + ' =';
		},

		determinePropertyGroup : function ( property ) {
			if ( ( property.search( 'width' ) !== -1 ) || ( property.search( 'Width' ) !== -1 ) ||
				( property.search( 'height' ) !== -1 ) || ( property.search( 'Height' ) !== -1 ) ||
				( property.search( 'margin' ) !== -1 ) || ( property.search( 'Margin' ) !== -1 ) ||
				( property.search( 'border' ) !== -1 ) || ( property.search( 'Border' ) !== -1 ) ||
				( property.search( 'padding' ) !== -1 ) || ( property.search( 'Padding' ) !== -1 )
				)
			{ return '= BOX ='; }

			if ( ( property.search( 'Animation' ) !== -1 ) )
			{ return '= ANIMATION ='; }

			if ( ( property === "config" ) || ( property.search( 'Config' ) !== -1 ) ||
				( property.search( 'defaults' ) !== -1 )
				)
			{ return '= CONFIG ='; }

			if ( ( property.search( 'class' ) !== -1 ) || ( property.search( 'Class' ) !== -1 ) )
			{ return '= CLASS ='; }

			if ( ( property.search( 'cls' ) !== -1 ) || ( property.search( 'Cls' ) !== -1 ) )
			{ return '= CSS CLASS ='; }

			if ( property === "container" )
			{ return "@"; }

			if ( ( property.search( 'element' ) !== -1 ) || ( property.search( 'Element' ) !== -1 ) ||
				( property.search( 'child' ) !== -1 ) || ( property.search( 'Child' ) !== -1 ) ||
				( property.search( 'parent' ) !== -1 ) ||
				( property.search( 'Sibling' ) !== -1 ) ||
				( property.search( 'dom' ) !== -1 ) )
			{ return '= ELEMENT ='; }

			if ( ( property.search( 'event' ) !== -1 ) || ( property.search( 'Event' ) !== -1 ) ||
				( property.search( 'listener' ) !== -1 ) || ( property.search( 'Listener' ) !== -1 ) ||
				( property.search( 'usedSelectors' ) !== -1 )
				)
			{ return '= EVENT ='; }

			if ( ( property.search( 'html' ) !== -1 ) || ( property.search( 'Html' ) !== -1 ) ||
				( property.search( 'HTML' ) !== -1 ) ||
				( property.search( 'contentEl' ) !== -1 )
				)
			{ return '= HTML ='; }

			if ( ( property.search( 'id' ) === 0 ) || ( property.search( 'Id' ) !== -1 ) ||
				( property.search( 'Name' ) === 0 ) ||
				( property.search( 'prefix' ) !== -1 ) || ( property.search( 'Prefix' ) !== -1 )
				)
			{ return '= ID ='; }

			if ( ( property === "parent" ) ||
				( property === "_rootObject" ) )
			{ return "= ITEM ="; }

			if ( ( property.search( 'item' ) !== -1 ) || ( property.search( 'Item' ) !== -1 ) )
			{ return '= ITEM ='; }

			if ( ( property === "mixins" ) || ( property.search( 'Mixin' ) !== -1 ) )
			{ return '= MIXIN ='; }

			if ( ( property.search( 'left' ) !== -1 ) || ( property.search( 'Left' ) !== -1 ) ||
				( property.search( 'top' ) !== -1 ) || ( property.search( 'Top' ) !== -1 ) ||
				( property.search( 'right' ) !== -1 ) || ( property.search( 'Right' ) !== -1 ) ||
				( property.search( 'bottom' ) !== -1 ) || ( property.search( 'Bottom' ) !== -1 ) ||
				( property.search( 'Position' ) !== -1 ) ||
				( property.search( 'offset' ) !== -1 ) ||
				( property.search( 'center' ) !== -1 ) ||
				( property.search( 'floating' ) !== -1 )
				)
			{ return '= POSITION ='; }

			if ( property.search( 'reference' ) !== -1 )
			{ return '= REFERENCE ='; }

			if ( ( property.search( 'tpl' ) !== -1 ) || ( property.search( 'Tpl' ) !== -1 ) )
			{ return '= TEMPLATE ='; }

			if ( ( property.search( "text" ) !== -1 ) || ( property.search( "Text" ) !== -1 ) )
			{ return "= TEXT ="; }

			if ( ( property === "xtype" ) || ( property.search( 'xtype' ) !== -1 ) ||
				( property === "alias" )
				)
			{ return '= XTYPE ='; }

			return null;
		},

		determineGroup : function ( value, property ) {    // search in property names
			var group = this.determinePropertyGroup( property );

			if ( group ) { return group; }

			if ( this.isCollectionValue( value ) )
			{ return this.determineCollectionGroup( value, property ); }

			if ( value instanceof Object )
			{ return this.determineObjectGroup( value, property ); }

			return this.determineItemGroup( value, property );
		},

		determineGroupedOk : function () { return this.fetchParentNavigationView().isDataListGrouped; },

		// Creates an array of row records, 1 for each property in object
		objectToPropertyRecs : function ( object ) {
			var recs = [];
			var navigationView = this.fetchParentNavigationView();
			var showOnlyOwnProps = navigationView.showOnlyOwnProperties;
			var groupedOk = this.determineGroupedOk();

			var parentTabPanel = this.fetchParentTabPanel();
			if ( parentTabPanel.isCollectionTabPanel || parentTabPanel.isMixedCollectionTabPanel )
			{  object = object.fetchValue();
				if ( !( object instanceof Ext.util.Collection ) && !( object instanceof Ext.util.MixedCollection ) )
				{ console.warn( 'object is not a collection in PropertiesList.objectToPropertyRecs' ); }
			}

			for ( var property in object )
			{  if ( showOnlyOwnProps && !object.hasOwnProperty( property ) )
				{ continue; }

				var value = object[ property ];
				if ( this.isValueOk( value, property ) )
				{  var group = groupedOk ? this.determineGroup( value, property ) : null;
					var record = this.createRowObject( value, property, group );
					recs.push( record );
				}
			}
			return recs;
		},

		// TODO: I do not know why, but methods are not sorting properly on their own
		collectRowObjects : function () {
			var newObject = this.fetchRootObject();
			var recs = this.objectToPropertyRecs( newObject );
			return recs.sort( this.comparisonFunction );
		},

		createRowObject : function ( value, id, group ) {
			var rec = this.callParent( arguments );
			rec.group = group;
			return rec;
		},

		comparisonFunction : function ( rec1, rec2 ) {
			if ( rec1.id > rec2.id )
			{ return 1; }

			if ( rec1.id < rec2.id )
			{ return -1; }

			return 0;
		}
	}
);
