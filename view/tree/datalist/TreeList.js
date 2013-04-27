Ext.define( 'uxExtSpect.view.tree.datalist.TreeList',
	{  extend: 'uxExtSpect.view.ExtSpectDataList',
		xtype: 'treelist',

		requires: [
			'uxExtSpect.store.tree.ListingStore' , 'uxExtSpect.store.tree.TreeListStore'
		],
		config: {
			indexBar: false
		},

		collectRowObjects: function () {
			this.rowObjects = this.collectComponentRowObjects();
			return this.rowObjects;
		},

		// TODO : Ext.ComponentManger.map has all the components
		collectComponentRowObjects: function () {
			var rootObject = this.fetchRootObject();
			this.componentRecs = [];
			if ( rootObject ) {
				this.depth = 1;
				this.totalCounts = [];
				this.counts = [];
				this.collectComponentRowObjects2( rootObject );
			}
			return this.componentRecs;
		},

		// see also buildFinalRowRecs2 and addNewRowObjects
		collectComponentRowObjects2: function ( component, index_, len_ ) {
			var newRowObject = this.createComponentRowObject( component );
			this.componentRecs.push( newRowObject );
			if ( "items" in component ) {
				var collection = component.items;
				var totalCount = collection.getCount();
				if ( totalCount > 0 ) {
					this.depth++;
					this.totalCounts.push( totalCount );
					this.counts.push( 0 );
					collection.each( this.collectComponentRowObjects2, this );
					this.counts.pop();
					this.totalCounts.pop();
					this.depth--;
				}
			}
		},

		createComponentRowObject: function ( component ) {
			return { text: this.computeRowObjectString( component ), value: component };
		},

		// see also collectComponentRowObjects
		buildFinalRowObjects: function ( rec ) {
			this.depth = 1;
			this.totalCounts = [];
			this.counts = [];
			this.buildFinalRowObject2( rec );
		},

		// see also collectComponentRecs2
		addNewRowObjects: function ( recs ) {
			var totalCount = recs.length;
			if ( totalCount > 0 ) {
				this.depth++;
				this.totalCounts.push( totalCount );
				this.counts.push( 0 );
				recs.forEach( this.buildFinalRowObject2, this );
				this.counts.pop();
				this.totalCounts.pop();
				this.depth--;
			}
		},

		buildFinalRowObject2: function ( baseRec, index, forEachArray ) {
			this.rowObjects.push( this.createRowObject( baseRec ) );
			var array = baseRec.children || [];
			this.addNewRowObjects( array );
		},

		// Ext.getClassName(), Ext.ClassManager.getDisplayName( Mixed object )
		createRowObject: function ( baseRec ) {
			if ( !baseRec ) {
				console.error( Ext.getDisplayName( arguments.callee ) + ': no baseRec', baseRec );
				debugger;
			}
			var object = baseRec.object;
			return { text: this.computeRowObjectString( object ), value: object };
		},

		computeRowObjectString: function ( object ) {
			var depth = this.depth;
			var counts = this.counts;
			var string = uxExtSpect.util.StringOf.to$( object );
			counts[ counts.length - 1 ]++;
			return this.fetchParentNavigationView().showListing ?
				string :
				(   uxExtSpect.instance.getUseTreeWithLines() ?
					this.computeVerticalBars().join( '' ) + this.computeObjectString( object ) :
					Ext.String.repeat( uxExtSpect.instance.getTreeIndentingChar(), depth ) + string
					);
		},

		computeObjectString: function ( object ) {
			return '<span style="font-weight:bold">' +
				uxExtSpect.util.StringOf.to$( object ) + '</span>';
		},

		verticalBarChar: String.fromCharCode( 0x2503 ), // 0x2503 0x2502
		verticalRightChar: String.fromCharCode( 0x2523 ), // 0x2523 0x251C 0x2520
		upAndRightChar: String.fromCharCode( 0x2517 ), // 0x2517 0x2514 0x2516
		// leftAndDownChar : String.fromCharCode( 0x2513 ) , // 0x2513 0x2511 0x2512
		// hotizontalAndDownChar : String.fromCharCode( 0x2533 ) , // 0x2533

		computeVerticalBars: function () {
			var chars = [];
			var totalCounts = this.totalCounts;
			var totalCountsLen = totalCounts.length;
			var counts = this.counts;

			for ( var index = 0 , len = totalCountsLen - 1; index < len; index++ ) {
				if ( counts[ index ] < totalCounts[ index ] ) { chars.push( this.verticalBarChar ); } // ┃
				else { chars.push( '&emsp;' ); }
			}

			if ( totalCountsLen > 0 ) {
				if ( counts[ index ] === totalCounts[ index ] ) { chars.push( this.upAndRightChar ); } // ┗
				else {
					chars.push( this.verticalRightChar ); // ┣
				}

				chars.push( '&nbsp;' );
			}
			return chars;
		},

		determineAndSetIndexBar: function () {
			var isListing = this.fetchParentNavigationView().showListing;
			this.setIndexBar( isListing );
		},

		handleItemTap: function ( dataview, index, element, record, event, object, eOptsObject ) {

			var value = record.data.value;
			// console.log( 'TreeList#handleItemTap record = ', record );

			if ( value && value.isPropertyPointerWithValue ) { value = value.fetchValue(); }
			// console.log( 'TreeList#handleItemTap value = ', value );

			if ( this.isInstance( value ) ) {
				var objectNavigationView = this.fetchObjectNavigationView();
				objectNavigationView.pushNewPropertiesPanel( value );
			}
			else {
				console.warn( Ext.displayName( arguments.callee ) +
					' selected item not an instance :', value );
			}

		}

	} );

