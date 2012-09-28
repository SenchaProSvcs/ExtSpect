Ext.define( 'extspect.view.tree.datalist.PropertiesTree',
	{  extend : 'extspect.view.tree.datalist.TreeList',

		collectRowObjects : function () {
			var object = this.fetchRootObject();
			if ( !object ) { return null; }

			this.baseRecs = [];
			this.branchObjects = [];
			this.depth = 0;
			var startRec = this.createRecTree( object, {}, [] );

			this.rowObjects = [];

			if ( this.baseRecs.length > 0 )
			{ this.buildFinalRowObjects( startRec ); }

			return this.rowObjects;
		},

		createRecTree : function ( object, parentRec, parentRecChildRecs ) {
			if ( this.depth > 19 ) {
				console.error( Ext.getDisplayName( arguments.callee ) + ': Exceeded depth = ' + this.depth );
				debugger;
			}
			var rec;
			// block repetition of an object in a branch
			var nextObject = object;
			if ( object.isPropertyPointerWithInstance ) { nextObject = object.fetchValue(); }
			if ( this.branchObjects.indexOf( nextObject ) !== -1 )
			{ console.groupEnd( "STOP BRANCH " + StringOf.to$( nextObject ) ); }
			else {
				rec = this.createRec( object );
				this.depth++;
				this.branchObjects.push( object );

				if ( this.isInstance( object ) ) {
					var skipDirectChild = parentRec.isPropertyPointerRec &&
						( !parentRec.object.isPropertyPointerWithArray );
					var childRecs = this.createChildRecs( object, rec );
					if ( skipDirectChild ) {
						var recIndex = parentRecChildRecs.indexOf( rec );
						if ( recIndex !== -1 )
						{
							console.error( 'createRecTree : rec found in parentRec.childRecs, rec =' +
								StringOf.to$( rec ), rec );
							debugger;
						}
						for ( var index = 0 , len = childRecs.length; index < len; index++ )
						{ parentRecChildRecs.push( childRecs[ index ] ); }
					}
					else {
						rec.children = childRecs;
						parentRecChildRecs.push( rec );
					}
				}

				this.depth--;
				this.branchObjects.pop();
			}
			return rec; // rec expected by collectRowObjects()
		},

		createChildRecs : function ( parentObject, parentRec ) {
			var properties = parentRec.fetchProperties();
			var childRecs = [];
			for ( var index = 0 , len = properties.length; index < len; index++ ) {
				var property = properties[ index ];
				if ( !( property in parentObject ) )
				{
					console.warn( '>>>> createChildRecs' +
						': "' + property + '" not in parentObject', parentObject );
				}
				else {
					var value = parentObject[ property ];

					if ( ( value instanceof Ext.util.MixedCollection ) || ( value instanceof Ext.util.Collection ) )
					{ value = this.extCollectionToArray( value ); }
					else {
						if ( ( value instanceof NodeList ) || ( value instanceof HTMLCollection ) )
						{ value = this.htmlCollectionToArray( value ); }
					}

					if ( value instanceof Array )
					{ this.createArrayRecs( parentObject, property, value, parentRec, childRecs ); }
					else {
						if ( this.isInstance( value ) ) {
							this.createChildRec( parentObject, property, value, parentRec, childRecs );
						}
					}
				}
			}
			return childRecs;
		},

		createArrayRecs : function ( parentObject, property, array, parentRec, childRecs ) {
			if ( parentObject.isPropertyPointerWithArray ) {
				for ( var index2 = 0 , len2 = array.length; index2 < len2; index2++ )
				{ this.createChildRec( array, index2, array[ index2 ], parentRec, childRecs ); }
			}
			else {
				if ( ( array.length > 0 ) && this.isInstance( array[0] ) ) {
					var pointer = this.createPropertyPointer( parentObject, property, array, 'extspect.object.pointer.PropertyPointerWithArray' );
					if ( pointer ) { this.createRecTree( pointer, parentRec, childRecs ); }
				}
			}
		},

		createChildRec : function ( parentObject, property, value, parentRec, childRecs ) {
			if ( ( property !== 'superclass' ) && ( property !== 'mixins' ) ) { }// do we need these ? (Check Ext tree)
			if ( parentObject.isPropertyPointerWithInstance ) {
				this.createRecTree( value, parentRec, childRecs );
			}
			else {
				var pointer = this.createPropertyPointer( parentObject, property, value,
					'extspect.object.pointer.PropertyPointerWithInstance' );
				if ( pointer ) { this.createRecTree( pointer, parentRec, childRecs ); }
			}
		},

		createPropertyPointer : function ( parentObject, property, value, pointerClassName ) {
			var pointer;

			var propertyCount = StringOf.propertyCount( value );
			if ( propertyCount > 0 ) {
				pointer = Ext.create( pointerClassName, {} );
				pointer.object = parentObject;
				pointer.property = property;
				pointer.value = value;
			}
			return pointer;
		},

		createRec : function ( object ) {
			if ( !object ) {
				console.error( Ext.getDisplayName( arguments.callee ) + ': no object', object );
				debugger;
			}
			var recClassName = this.determineRecClassName( object );
			var rec = Ext.create( recClassName, {} );
			rec.object = object;
			rec.listenersOk = this.listenersOk;
			rec.esClassName = recClassName; // not used, just for debugging
			this.baseRecs.push( rec );
			return rec;
		},

		requires : [
			'extspect.object.rec.ApplicationRec' ,
			'extspect.object.rec.ComponentRec' ,
			'extspect.object.rec.ControllerRec' ,
			'extspect.object.rec.DispatcherRec' ,
			'extspect.object.rec.ExtElementRec' ,
			'extspect.object.rec.HtmlDocumentRec' ,
			'extspect.object.rec.HtmlElementRec' ,
			'extspect.object.rec.ModelRec' ,
			'extspect.object.rec.PropertyPointerRec' ,
			'extspect.object.pointer.PropertyPointerWithInstance' ,
			'extspect.object.pointer.PropertyPointerWithArray' ,
			'extspect.object.rec.ProxyRec' ,
			'extspect.object.rec.RouteRec' ,
			'extspect.object.rec.RouterRec'  ,
			'extspect.object.rec.SimpleObjectRec' ,
			'extspect.object.rec.StoreRec'  ,
			'extspect.object.rec.StoreManagerRec'
		],

		determineRecClassName : function ( object ) {
			var recClassName;
			if ( object.isPropertyPointerWithValue )
			{ recClassName = 'extspect.object.rec.PropertyPointerRec'; }
			else {
				if ( object.hasOwnProperty( "modelName" ) ) // $className
				{ recClassName = 'extspect.object.rec.ModelRec'; }
				else {
					if ( object instanceof Ext.app.Application )
					{ recClassName = 'extspect.object.rec.ApplicationRec'; }
					else {
						if ( object instanceof Ext.app.Controller )
						{ recClassName = 'extspect.object.rec.ControllerRec'; }
						else {
							if ( object instanceof Ext.lib.Component )
							{ recClassName = 'extspect.object.rec.ComponentRec'; }
							else {
								if ( object instanceof Ext.event.Dispatcher )
								{ recClassName = 'extspect.object.rec.DispatcherRec'; }
								else {
									if ( object instanceof Ext.dom.Element )
									{ recClassName = 'extspect.object.rec.ExtElementRec'; }
									else {
										if ( object instanceof HTMLElement )
										{ recClassName = 'extspect.object.rec.HtmlElementRec'; }
										else {
											if ( object instanceof HTMLDocument )
											{ recClassName = 'extspect.object.rec.HtmlDocumentRec'; }
											else {
												if ( object instanceof Ext.data.proxy.Proxy )
												{ recClassName = 'extspect.object.rec.ProxyRec'; }
												else {
													if ( object instanceof Ext.app.Route )
													{ recClassName = 'extspect.object.rec.RouteRec'; }
													else {
														if ( object instanceof Ext.app.Router )
														{ recClassName = 'extspect.object.rec.RouterRec'; }
														else {
															if ( object.isStore || ( object instanceof Ext.data.Store ) )
															{ recClassName = 'extspect.object.rec.StoreRec'; }
															else {
																if ( object === Ext )
																{ recClassName = 'extspect.object.rec.ExtRec'; }
																else {
																	if ( object instanceof Object )
																	{ recClassName = 'extspect.object.rec.SimpleObjectRec'; }
																	else { recClassName = 'extspect.object.rec.BaseRec'; }
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			return recClassName;
		}
	}
);
