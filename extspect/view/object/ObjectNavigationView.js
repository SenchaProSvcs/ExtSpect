Ext.define( 'extspect.view.object.ObjectNavigationView',
	{  extend : 'extspect.view.ExtSpectNavigationView',
		xtype : 'objectnavigationview',
		id : 'es-objectnavigationview',
		dataListStoreName : 'extspect.store.object.property.PropertiesListStore',

		requires : [
			'extspect.view.object.tabpanel.ArrayTabPanel' ,
			'extspect.view.object.tabpanel.CollectionTabPanel' ,
			'extspect.view.object.tabpanel.MixedCollectionTabPanel' ,
			'extspect.view.object.tabpanel.ExtObjectTabPanel'
		],

		showOnlyOwnProperties : false,

		config : { items : [
			{ xtype : 'extobjecttabpanel' }
		] },

		// called by ObjectNavigationView#onBackButtonTap()
		// p. 4-36 Touch manual says this is needed
		// or use autoDestroy: true
		// TODO: You also want to get rid of the store
		/*  pop : function ( )
		 {	Trace.start()
		 // var currentTabPanel = this._activeItem
		 // Trace.vars( 'currentTabPanel' , currentTabPanel )
		 this.callParent( arguments )
		 // currentTabPanel.destroy() // it is sufficient to make sure
		 //	the parent method gets called
		 // TODO: Should refresh/update the current tree view
		 // 	by resetting the data in the store
		 Trace.end()
		 } , */

		canDrillDown : function ( newObject ) {
			if ( newObject instanceof RegExp )
			{ return false; }

			if ( StringOf.propertyCount( newObject ) === 0 )
			{ return false; }

			// TODO: BUGGY
			// if ( newObject === this.getRootObject() )
			// { 	Trace.vars( 'Same object' , newObject)
			// return false }
			return true;
		},

		computeTitleString : function ( object ) {
			var titleWidthInChars = this.getWidth() / 13;
			return Ext.String.ellipsis( StringOf.to$( object ), titleWidthInChars, true );
		},

		setStartObject : function ( startObject ) {
			this.setRootObject( startObject );

			var tabPanel = this.down( 'extobjecttabpanel' );
			tabPanel.setRootObject( startObject );

			var navigationBar = this.getNavigationBar();
			var titleComponent = navigationBar.titleComponent;
			// titleComponent.minWidth = '300' , // BUG: this should not be necessary

			var title = this.computeTitleString( startObject );
			// The 2 lines below do not blow up, but seem to have little effect
			navigationBar.setTitle( title );
			tabPanel.setTitle( title );

			// Below works for startup, but the title is no longer there when you click the back button
			titleComponent.setTitle( title );
		},

		pushNewPropertiesPanel : function ( newObject ) {
			if ( this.canDrillDown( newObject ) ) {
				this.setRootObject( newObject );

				var title = this.computeTitleString( newObject );

				var tabPanelString = ( newObject instanceof Ext.Base ) ?
					'extspect.view.object.tabpanel.ExtObjectTabPanel' :
					'extspect.view.object.tabpanel.InstanceTabPanel';
				var tabPanel = Ext.create( tabPanelString );

				tabPanel.setRootObject( newObject );
				this.push( { title : title, items : tabPanel, layout : 'card' } );

				var treeNavigationView = ExtSpect.fetchTreeNavigationView();
				treeNavigationView.selectNewObject( newObject );

				// TODO: Should refresh/update the current tree view
				// by resetting the data in the store
			}
		},

		// push a new array list into the navigation view
		pushNewArrayPanel : function ( array, previousProperty, previousTabPanel, panelClass ) {
			if ( array.length === 0 ) { return; }

			if ( ( array.length === 1 ) && ( array[ 0 ] instanceof Object ) )
			{ this.pushNewPropertiesPanel( array[ 0 ] ); }
			else {
				var previousObject = previousTabPanel.fetchRootObject();
				// Trace.vars( 'previousObject', previousObject , 'previousProperty' , previousProperty )
				var pointer = Ext.create( 'extspect.object.pointer.PropertyPointer', {} );
				pointer.object = previousObject;
				pointer.property = previousProperty;
				this.setRootObject( pointer );

				// Trace.vars( 'previousObject', previousObject , 'newObject' , newObject )
				var newTabPanel = Ext.create( panelClass || 'extspect.view.object.tabpanel.ArrayTabPanel' );
				newTabPanel.setRootObject( pointer );

				// TODO: If you are drilling down thru an array of arrays, title$ might be wrong!
				var title = pointer.extspectString();
				this.push( { title : title, items : [newTabPanel], layout : 'card' } );

				// TODO: Should refresh/update the current tree view
				// by resetting the data in the store
			}
		}
	}
);
