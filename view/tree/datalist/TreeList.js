Ext.define( 'uxExtSpect.view.tree.datalist.TreeList',
	{  extend: 'uxExtSpect.view.ExtSpectDataList',
		xtype: 'treelist',

		requires: [
			'uxExtSpect.store.tree.ListingStore' ,
			'uxExtSpect.store.tree.TreeListStore'
		],
		config: {
			indexBar: false
		},

		collectRowObjects: function () {
			this.rowObjects = this.collectComponentRowObjects();
			return this.rowObjects;
		},

		// TODO : Ext.ComponentManger.map has all the components
		// Normally the root object is the Ext.Viewport
		collectComponentRowObjects: function () {
			var rootObject = this.fetchRootObject();
			this.componentRecs = [];
			if ( rootObject ) {
				this.depth = 1;
				this.totalCounts = [];
				this.counts = [];
				this.collectComponentRowObjects2( rootObject );
			}
			// console.log( arguments.callee.displayName, this.componentRecs.length );
			return this.componentRecs;
		},

		// see also buildFinalRowRecs2 and addNewRowObjects
		collectComponentRowObjects2: function ( component, index_, len_ ) {
			var newRowObject = this.createComponentRowObject( component );
			this.componentRecs.push( newRowObject );
			if ( "items" in component && !this.fetchIsClosed( component ) ) {
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
			var objectString = uxExtSpect.util.StringOf.to$( object );
			// console.log( arguments.callee.displayName, objectString );
			if ( this.fetchIsClosed( object ) ) {
				objectString += ' ++';
			}
			counts[ counts.length - 1 ]++;
			return this.fetchParentNavigationView().showListing ?
				objectString :
				(   uxExtSpect.instance.getUseTreeWithLines() ?
					this.computeVerticalBars().join( '' ) + this.computeObjectString( object, objectString ) :
					Ext.String.repeat( uxExtSpect.instance.getTreeIndentingChar(), depth ) + objectString
					);
		},

		computeObjectString: function ( object, objectString ) {
			return '<span style="font-weight:bold">' +
				// uxExtSpect.util.StringOf.to$( object )
				objectString + '</span>';
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

		handleSingleItemTap: function ( dataview, index, listItem, record, mouseEvent, obj, eOptsObject ) {
			// console.log( arguments.callee.displayName, arguments );
			// console.log( arguments.callee.displayName, "record=", record );
			var value = record.data.value;
			// console.log( arguments.callee.displayName, "value.id||$className=", value.id || value.$className )

			if ( value && value.isPropertyPointerWithValue ) { value = value.fetchValue(); }

			if ( this.isInstance( value ) ) {
				var objectNavigationView = this.fetchObjectNavigationView();
				objectNavigationView.pushNewPropertiesPanel( value );
			}
			else {
				console.warn( Ext.displayName( arguments.callee ) +
					' selected item not an instance :', value );
			}
		},

		fetchItemId: function ( object ) {
			return  (object.superclass || object === Ext.Base) ? object.$className : object.id;
			// uxExtSpect.util.StringOf.to$( object );//
		},

		extspectItemsClosedObject: {},

		fetchIsClosedObject: function ( object ) {
			var isClosedObject = this.extspectItemsClosedObject;
//			console.log( arguments.callee.displayName, object.$className || object.id,
//				"isClosedObject=", isClosedObject );
			var itemId = this.fetchItemId( object );
			isClosedObject[ itemId ] = false;
			// isClosedObject[ ( object.$className || object.id) + "fICO"] = Math.random();
			// console.log( arguments.callee.displayName, object.$className || object.id, "==", isClosedObject );
			//	debugger;
			//	}
			return isClosedObject
		},

		fetchIsClosed: function ( object ) {
			var isClosedObject = this.fetchIsClosedObject( object );
			// console.log( arguments.callee.displayName, object.$className || object.id, isClosedObject );
			var itemId = this.fetchItemId( object );
			var isClosed = isClosedObject[ itemId ];
			console.log( arguments.callee.displayName, object.$className || object.id, isClosed );
			return isClosed;
		},

		assignIsClosed: function ( object, bool ) {
			console.group( arguments.callee.displayName, object.$className || object.id, "bool=", bool );
			var isClosedObject = this.fetchIsClosedObject( object );
			console.log( arguments.callee.displayName, "isClosedObject=", isClosedObject );
			var itemId = this.fetchItemId( object );
			isClosedObject[ itemId ] = bool;
			// isClosedObject[ object.$className || object.id ] = Math.random();
			console.log( arguments.callee.displayName, "isClosedObject=", isClosedObject );
			console.groupEnd( arguments.callee.displayName, "isClosedObject=", isClosedObject );
		},

		handleDoubleItemtap: function ( dataview, index, listItem, record, mouseEvent, obj, eOptsObject ) {
			// console.log( arguments.callee.displayName, arguments );
			var object = record.data.value
			console.group( arguments.callee.displayName, "object.id||$className=", object.$className || object.id )
			var isClosed = this.fetchIsClosed( object );
			// console.log( arguments.callee.displayName, dataview.id );
			this.assignIsClosed( object, !isClosed );
			this.computeAndSetData();
			this.handleSingleItemTap( dataview, index, listItem, record, mouseEvent, obj, eOptsObject );
			console.groupEnd( arguments.callee.displayName, "isClosed=", isClosed );
		}
	} );
