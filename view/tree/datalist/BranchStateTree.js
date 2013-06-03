/* A BranchStateTree allows double taps and long presses
 The information about the state of the node is stored in a
 branchStateObjectFor the actual object of the node.
 This way, the tree 'remembers' what was open and closed
 between redraws of the Tree.
 */

Ext.define( 'uxExtSpect.view.tree.datalist.BranchStateTree',
	{  extend: 'uxExtSpect.view.tree.datalist.TreeList',

		config: {
			scrollToTopOnRefresh: false,
			listeners: {
				itemdoubletap: function () { this.handleItemDoubleTap.apply( this, arguments ); },
				itemtaphold: function () { this.handleItemTapHold.apply( this, arguments ); }
			}
		},
		branchStateObjectFor: function ( object, listIdString ) {
			var stateObject = object.hasOwnProperty( 'extspectBranchStateObject' ) &&
				object.extspectBranchStateObject;
			if ( ! stateObject ) {
				stateObject = new Object();
				stateObject[ listIdString ] = 'all';
				object.extspectBranchStateObject = stateObject;
			}
			return stateObject
		},

		// branchState represents how many levels of descendents will be shown from this node
		// possible values are: 'all' | 'none' | 'kids'. Kids means 1 level.
		branchStateOf: function ( object ) {
			var listIdString = this.idStringFor( object );
			var stateObject = this.branchStateObjectFor( object, listIdString );
			return stateObject[ listIdString ];
		},

		isClosed: function ( object ) {
			return this.branchStateOf( object ) === 'none'
		},

		isShowingKids: function ( object ) {
			return this.branchStateOf( object ) === 'kids'
		},

		spanStringOf: function ( object, objectString ) {
			var string = this.callParent( arguments );
			if ( this.isClosed( object ) ) {
				string = '<u>' + string + '</u>';
			}
//			else
//			if ( this.isShowingKids( object ) ) {
//				string = '<i>' + string + '</i>';
//			}
			return string;
		},

		rowStringOf: function ( object ) {
			this.setBranchStateNoneIfParentStateIsKids( object );
			return this.callParent( arguments );
		},

		setBranchState: function ( object, string ) {
			var listIdString = this.idStringFor( object );
			var stateObject = this.branchStateObjectFor( object, listIdString );
			stateObject[ listIdString ] = string;
		},

		setBranchStateNoneIfParentStateIsKids: function ( object ) {
			//console.log( arguments.callee.displayName, 'o=' + object.id );

			var parent = this.parentOf( object );
			//	if ( parent ) {console.log( arguments.callee.displayName, 'p=' + parent.id );}

			if ( parent && this.isShowingKids( parent ) ) {
				//	console.log( arguments.callee.displayName, 'isSC=' + this.isShowingKids( parent ) );
				this.setBranchState( object, 'none' );
			}
		},

		handleItemDoubleTap: function ( dataview, index, listItem, record ) {
			var object = record.data.value
			var isClosed = this.isClosed( object );

			// console.log( arguments.callee.displayName, isClosed );
			this.setBranchState( object, isClosed ? 'kids' : 'none' );

			var parent = this.parentOf( object );
			if ( parent && this.isShowingKids( parent ) ) {
				this.setBranchState( parent, 'all' );
			}

			// console.log( arguments.callee.displayName, this.branchStateOf( object ) );
			this.computeAndSetData();
			this.selectValue( object );
		},

		handleItemTapHold: function ( dataview, index, listItem, record ) {
			var object = record.data.value
			var branchState = this.branchStateOf( object );
			// console.log( arguments.callee.displayName, '1 ' + this.branchStateOf( object ) );
			if ( branchState === 'all' ) {
				this.setBranchState( object, 'none' );
			}
			else {
				this.setBranchState( object, 'all' );
				this.setSubpartsBranchStateToAll( object );
			}
			// console.log( arguments.callee.displayName, '2 ' + this.branchStateOf( object ) );
			this.computeAndSetData();
			// this.selectValue( object );
		},

		setSubpartsBranchStateToAll: function ( object ) {
			// console.log( arguments.callee.displayName, object.$className );
			// debugger;
			if ( this.isContainerOrClass( object ) ) {
				this.setBranchState( object, 'all' );
				var subparts = this.objectSubparts( object );
				// console.log( arguments.callee.displayName, subparts.extspectString() );
				subparts.forEach( this.setSubpartsBranchStateToAll, this );
			}
		}
	}
);
