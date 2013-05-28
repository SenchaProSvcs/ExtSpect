Ext.define( 'uxExtSpect.view.tree.datalist.TreeList',
	{  extend: 'uxExtSpect.view.ExtSpectDataList',
		xtype: 'treelist',

		requires: [
			'uxExtSpect.store.tree.ListingStore' ,
			'uxExtSpect.store.tree.TreeListStore'
		],
		config: {
			indexBar: false,
			scrollToTopOnRefresh: false,
		},

		valueString2: function ( object, objectString ) {
			return '<span style="font-weight:bold">' + objectString + '</span>';
		},

		selectValue: function ( value ) {
			var store = this.getStore();
			if ( store ) { // a list that is not visible mght not have a store
				var objectString = this.valueString( value );
				var record = store.findRecord( "text", objectString, 0, true );
				if ( record ) {
					this.deselectAll();
					this.select( record, false );
				}
			}
		},

		// see also collectComponentRowObjects
		buildFinalRowObjects: function ( object ) {
			// console.log( arguments.callee.displayName, object );
			this.depth = 1;
			this.totalCounts = [];
			this.counts = [];
			this.buildFinalRowObject2( object );
		},

		// see also addSubcomponentRowObjects
		addNewRowObjects: function ( objects ) {
			var totalCount = objects.length;
			if ( totalCount > 0 ) {
				this.depth ++;
				this.totalCounts.push( totalCount );
				this.counts.push( 0 );
				objects.forEach( this.buildFinalRowObject2, this );
				this.counts.pop();
				this.totalCounts.pop();
				this.depth --;
			}
		},

		buildFinalRowObject2: function ( object ) {
			this.rowObjects.push( this.createFinalRowObject( object ) );
			var array = object.children || [];
			this.addNewRowObjects( array );
		},

		createFinalRowObject: function ( object ) {
			if ( ! object ) {
				console.error( Ext.getDisplayName( arguments.callee ) + ': no baseRowObject', object );
				debugger;
			}
			var value = object.object;
			return { text: this.computeRowObjectString( value ), value: value };
		},

		computeRowObjectString: function ( object ) {
			var depth = this.depth;
			var counts = this.counts;
			var objectString = this.valueString( object );
			if ( this.fetchIsClosed( object ) ) {
				objectString += ' ++';
			}
			counts[ counts.length - 1 ] ++;

			return this.fetchParentNavigationView().showListing ?
				objectString :
				(   uxExtSpect.instance.getUseTreeWithLines() ?
					this.computeVerticalBars().join( '' ) + this.valueString2( object, objectString ) :
					Ext.String.repeat( uxExtSpect.instance.getTreeIndentingChar(), depth ) + objectString
					);
		},

		verticalBarChar: String.fromCharCode( 0x2503 ), // 0x2503 0x2502
		verticalRightChar: String.fromCharCode( 0x2523 ), // 0x2523 0x251C 0x2520
		upAndRightChar: String.fromCharCode( 0x2517 ), // 0x2517 0x2514 0x2516
		// leftAndDownChar : String.fromCharCode( 0x2513 ) , // 0x2513 0x2511 0x2512
		// hotizontalAndDownChar : String.fromCharCode( 0x2533 ) , // 0x2533

		// return an array of chars representing on the left the tree and its branches
		computeVerticalBars: function () {
			var chars = [];
			var totalCounts = this.totalCounts;
			var totalCountsLen = totalCounts.length;
			var counts = this.counts;

			for ( var index = 0 , len = totalCountsLen - 1; index < len; index ++ ) {
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

		// show the indexBar on the right only if this is a listing and not a tree
		determineAndSetIndexBar: function () {
			var isListing = this.fetchParentNavigationView().showListing;
			this.setIndexBar( isListing );
		},

		handleSingleItemTap: function ( dataview, index, listItem, record ) {
			// console.log( arguments.callee.displayName, "record=", record );
			var value = record.data.value;

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

		fetchIdString: function ( object ) { return this.id; },

		fetchIsClosedObject: function ( object, idString ) {
			var isClosedObject = object.hasOwnProperty( 'extSpectisClosedObject' ) &&
				object.extSpectisClosedObject;
			if ( ! isClosedObject ) {
				isClosedObject = new Object();
				isClosedObject[ idString ] = false;
				object.extSpectisClosedObject = isClosedObject;
			}
			return isClosedObject
		},

		fetchIsClosed: function ( object ) {
			var idString = this.fetchIdString( object );
			var isClosedObject = this.fetchIsClosedObject( object, idString );
			var isClosed = isClosedObject[ idString ];
			// console.log( arguments.callee.displayName, idString, isClosed );
			return isClosed;
		},

		assignIsClosed: function ( object, bool ) {
			var idString = this.fetchIdString( object );
			//console.group( arguments.callee.displayName, idString, "bool=", bool );
			var isClosedObject = this.fetchIsClosedObject( object, idString );
			// console.log( arguments.callee.displayName, "isClosedObject=", isClosedObject );
			isClosedObject[ idString ] = bool;
			// isClosedObject[ object.$className || object.id ] = Math.random();
			// console.log( arguments.callee.displayName, "isClosedObject=", isClosedObject );
			// console.groupEnd( arguments.callee.displayName, "isClosedObject=", isClosedObject );
		},

		handleDoubleItemtap: function ( dataview, index, listItem, record ) {
			// console.log( arguments.callee.displayName, arguments );
			var object = record.data.value
			console.group( arguments.callee.displayName, "object.$className||id=", object.$className || object.id )
			var isClosed = this.fetchIsClosed( object );
			console.log( arguments.callee.displayName, isClosed );
			this.assignIsClosed( object, ! isClosed );
			this.computeAndSetData();

			this.selectValue( object );
			console.groupEnd( arguments.callee.displayName, "isClosed=", isClosed );
		}
	}
);
