Ext.define( 'ux.extspect.util.StringOf', { } );

// ---------- ux.extspect.util.StringOf constants

if ( !ux.extspect.util.StringOf ) { ux.extspect.util.StringOf = {} }

ux.extspect.util.StringOf.empty$ = '';

// ux.extspect.util.StringOf.doubleQuoteChar = '"';
ux.extspect.util.StringOf.leftDoubleQuoteChar = '"'; // String.fromCharCode( 0x201c )
ux.extspect.util.StringOf.rightDoubleQuoteChar = '"'; //String.fromCharCode( 0x201d )
ux.extspect.util.StringOf.leftSingleQuoteChar = "'"; // String.fromCharCode( 0x2018 )
ux.extspect.util.StringOf.rightSingleQuoteChar = "'";// String.fromCharCode( 0x2019 )

ux.extspect.util.StringOf.leftBrace$ = '{';		// String.fromCharCode( 0x276e )
ux.extspect.util.StringOf.rightBrace$ = '}';     // String.fromCharCode( 0x276f )


// ---------- ux.extspect.util.StringOf.class$

ux.extspect.util.StringOf.class$ = function ( value ) {
	return value.hasOwnProperty( "superclass" ) ? ux.extspect.util.StringOf.object$( value, '' ) : null;
};
ux.extspect.util.StringOf.class$._name = 'ux.extspect.util.StringOf.class$';

// ---------- ux.extspect.util.StringOf.ellipsis$

// TODO: 50 needs to be a function of the width of the panel
// Ext.Viewport.getWindowWidth() / 2
// or ux.extspect.getColumnWidth()
ux.extspect.util.StringOf.ellipsis$ = function ( string ) {
	return Ext.String.ellipsis( string, 50, true );
};
ux.extspect.util.StringOf.ellipsis$._name = 'ux.extspect.util.StringOf.ellipsis$';

// ---------- ux.extspect.util.StringOf.to$

ux.extspect.util.StringOf.to$ = function ( value ) {
	var typeString = typeof( value );
	// console.log( 'ux.extspect.util.StringOf.to$ 0: ' + typeString , value );

	if ( value === undefined ) { return 'undefined'; }

	if ( value === null ) { return 'null'; }

	switch ( typeString ) {    // '123' instanceof String -> false
		case 'string' :       // : return 	this.ellipsis$( value )
			return this.leftDoubleQuoteChar +
				this.ellipsis$( value ) +
				this.rightDoubleQuoteChar;
		case 'number'    :
			return value.toString();// 123 instanceof Number -> false
		case 'boolean'    :
			return value.toString();// true instanceof Boolean -> false
		case 'regexp'        :
			return this.ellipsis$( value.toString() );
		// other built-in types : date , error , array , function
	}

	var fnctn = value.extspectString;
	if ( fnctn instanceof Function ) { return fnctn.call( value );}

	return this.object$( value, typeString );
};
ux.extspect.util.StringOf.to$._name = 'ux.extspect.util.StringOf.to$';

// ---------- ux.extspect.util.StringOf.object$

ux.extspect.util.StringOf.object$ = function ( object, typeString ) {
	if ( !( object instanceof Object ) ) {
		console.error( ux.extspect.util.StringOf.functionName( arguments.callee ) + ': object =', object );
		debugger;
	}
	else {
		var dataString = object.id || object.name || '';

		if ( object.hasOwnProperty( "$className" ) ) {
			dataString = this.lastPartOfName( object.$className || dataString, 2 );
			// if ( ! object.hasOwnProperty( "superclass" ) ) Ext.Base
			// {	console.warn( 'ux.extspect.util.StringOf.object$, $className but no superclass, ' , object ) }
		}

		typeString = object.type || typeString;

		if ( object.hasOwnProperty( "superclass" ) ) // this is a Sencha template class or an $owner
		{ typeString = 'TC'; }
		else
		// Ext.getClassName(), Ext.ClassManager.getDisplayName( Mixed object )
		{
			if ( ( "xtype" in object ) && ( object instanceof Ext.Base ) ) {
				dataString = object.id || object.xtype;
				var text = object._text; // Ext.Button
				if ( text ) { dataString = dataString + '&lt;' + text + '&gt;';}
				return dataString;
			}
			else
			// Nodes : localName, nodeName, nodeValue, childNodes, parentNodes, attributes, textContent
			// Element : tagName, getAttribute( 'name' )
			// HTMLElements : id, title, className
			{
				if ( "localName" in object ) // Node
				{	typeString = object.localName || object.nodeName || object.tagName ||
						this.nodeType$( object.nodeType );
					dataString = object.nodeValue || object.id || dataString || object.src || object.href;
					if ( dataString ) { dataString = this.lastPartOfName( dataString, 2, '/' ); }
					// if ( "getAttribute" in object ) // Element
					// {	dataString = object.getAttribute( 'name' ) || dataString }
				}
				else {
					if ( "$className" in object ) // Sencha
					{  typeString = this.lastPartOfName( object.$className || typeString );}
					else { typeString = this.constructorName( object );}
				}
			}
		}
	}

	if ( !dataString ) { dataString = this.objectData$( object ); }
	else { dataString = this.quote$( dataString );}

	var string = ( object instanceof Element ) ?
		this.element$( typeString, dataString ) :
		this.embrace$( typeString, dataString );
	return string;
};
ux.extspect.util.StringOf.object$._name = 'ux.extspect.util.StringOf.object$';

// ---------- ux.extspect.util.StringOf.quote$

ux.extspect.util.StringOf.quote$ = function ( dataString ) {
	return this.leftSingleQuoteChar + dataString + this.rightSingleQuoteChar;
};
ux.extspect.util.StringOf.quote$._name = 'ux.extspect.util.StringOf.quote$';

// ---------- ux.extspect.util.StringOf.embrace$

ux.extspect.util.StringOf.embrace$ = function ( typeString, dataString ) {
	var string = this.leftBrace$ + dataString + this.rightBrace$;
	if ( typeString ) { string = typeString + string;}
	return string;
};
ux.extspect.util.StringOf.embrace$._name = 'ux.extspect.util.StringOf.embrace$';

// ---------- ux.extspect.util.StringOf.element$

ux.extspect.util.StringOf.element$ = function ( typeString, dataString ) {
	return '&lt;' + typeString + ' ' + dataString + '&gt;';
};
ux.extspect.util.StringOf.element$._name = 'ux.extspect.util.StringOf.element$';

// ---------- ux.extspect.util.StringOf.propertyCount

ux.extspect.util.StringOf.propertyCount = function ( object ) {
	var count = 0;
	for ( var property in object ) { count++; }
	return count;
};
ux.extspect.util.StringOf.propertyCount._name = 'propertyCount.object$';

// ---------- ux.extspect.util.StringOf.ownPropertyCount

/*
 ux.extspect.util.StringOf.ownPropertyCount = function ( object )
 {	var count = 0
 for (	var property in object )
 {	if ( object.hasOwnProperty( property ) )
 {	count ++ }
 }
 return count
 }
 ux.extspect.util.StringOf.ownPropertyCount._name = 'ownPropertyCount.object$'
 */

// ---------- ux.extspect.util.StringOf.objectData$

ux.extspect.util.StringOf.to$_depth = 0;

ux.extspect.util.StringOf.objectData$ = function ( object ) {
	var propertyCount = 0;
	var methodCount = 0;
	var dataString = '';
	this.to$_depth++;
	if ( this.to$_depth > 5 ) // Ext.browser.version , Ext.DomHelper
	{ return '...etc...'; }

	for ( var property in object ) {
		if ( object[ property ] instanceof Function ) { methodCount++;}
		else { propertyCount++;}
	}

	if ( ( propertyCount === 0 ) &&
		( methodCount === 0 )
		) { dataString = '0...'; }
	else {
		if ( ( propertyCount <= 4 ) && ( propertyCount > 0 ) ) { dataString = this.objectProperties$( object ); }
		else {
			dataString = '...' + propertyCount + 'p/' + methodCount + 'm';
			//	( methodCount ? ( 'p/' + methodCount + 'm' ) : ux.extspect.util.StringOf.empty$ )
		}
	}
	this.to$_depth--;
	return dataString;
};
ux.extspect.util.StringOf.objectData$._name = 'ux.extspect.util.StringOf.object$';

// ---------- ux.extspect.util.StringOf.objectProperties$

ux.extspect.util.StringOf.objectProperties$ = function ( object ) {
	var string = '';
	for ( var property in object ) {
		var value = object[ property ];
		if ( !( value instanceof Function ) ) { string += property + ': ' + this.to$( value ) + ', '; }
	}
	string = string.substring( 0, string.length - 2 );
	string = this.ellipsis$( string );
	return string;
};
ux.extspect.util.StringOf.objectProperties$._name = 'ux.extspect.util.StringOf.object2$';

// ---------- ux.extspect.util.StringOf.nodeType$

// domTraces.js

ux.extspect.util.StringOf.nodeType$ = function ( nodeTypeInteger ) {
	switch ( nodeTypeInteger ) {
		case Node.ELEMENT_NODE :
			return 'ELEMENT_NODE';                                // 1
		case Node.ATTRIBUTE_NODE :
			return 'ATTRIBUTE_NODE';                             // 2
		case Node.TEXT_NODE :
			return 'TEXT_NODE';                                      // 3
		case Node.CDATA_SECTION_NODE :
			return 'CDATA_SECTION_NODE';                    // 4
		case Node.ENTITY_REFERENCE_NODE :
			return 'ENTITY_REFERENCE_NODE';                 // 5
		case Node.ENTITY_NODE :
			return 'ENTITY_NODE';                                     // 6
		case Node.PROCESSING_INSTRUCTION_NODE :
			return 'PROCESSING_INSTRUCTION_NODE';    // 7
		case Node.COMMENT_NODE :
			return 'COMMENT_NODE';                             // 8
		case Node.DOCUMENT_NODE :
			return 'DOCUMENT_NODE';                             // 9
		case Node.DOCUMENT_FRAGMENT_NODE :
			return 'DOCUMENT_FRAGMENT_NODE';         // 11
		case Node.DOCUMENT_TYPE_NODE :
			return 'DOCUMENT_TYPE_NODE';                     // 10
		case Node.NOTATION_NODE :
			return 'NOTATION_NODE';                            // 12
		default :
			return 'no nodeType_num';
	}
};
ux.extspect.util.StringOf.nodeType$._name = 'ux.extspect.util.StringOf.nodeType$';

// ---------- ux.extspect.util.StringOf.functionName

ux.extspect.util.StringOf.functionName = function ( fnctn ) {
	if ( !( fnctn instanceof Function ) ) {
		console.error( 'ux.extspect.util.StringOf.functionName : fnctn = ', fnctn );
		return null;
	}
	var name = fnctn.name || fnctn._name || fnctn.displayName || fnctn.$name || 'function';
	return ux.extspect.util.StringOf.lastPartOfName( name );
};
ux.extspect.util.StringOf.functionName._name = 'ux.extspect.util.StringOf.functionName';

// ---------- ux.extspect.util.StringOf.constructorName

// determine the typeString from the object's constuctor
// The function name of a config = ''

ux.extspect.util.StringOf.constructorName = function ( value ) {
	var fnctnName = null;
	var fnctn = value.constructor;

	if ( fnctn instanceof Function ) { fnctnName = this.functionName( fnctn ); }

	if ( fnctnName ) {
		var index = fnctnName.indexOf( '#constructor' ); // Sencha Ext
		if ( 0 < index ) { fnctnName = fnctnName.substring( 0, index ); }
		else {
			if ( fnctnName === 'Object' ) { fnctnName = 'O'; }
			else {
				if ( fnctnName === 'function' ) { fnctnName = this.empty$;}
			}
		}
	}
	return fnctnName;
};
ux.extspect.util.StringOf.constructorName._name = 'ux.extspect.util.StringOf.determineConstructorName';

// ---------- ux.extspect.util.StringOf.lastPartOfName

// if the name contains dots , take the last part of the name

ux.extspect.util.StringOf.lastPartOfName = function ( name, count, separator ) {
	if ( !separator ) { separator = '.';}
	var index = name.lastIndexOf( separator );
	if ( index > 4 ) {
		if ( count > 1 ) {
			var subnames = name.split( separator );
			var len = subnames.length;
			name = subnames[ len - 2 ] + separator + subnames[ len - 1 ];
		}
		else { name = name.substring( index + 1, name.length );}
	}
	return name;
};
ux.extspect.util.StringOf.lastPartOfName._name = 'ux.extspect.util.StringOf.lastPartOfName';

// ---------- ux.extspect.util.StringOf.array$

ux.extspect.util.StringOf.array$ = function ( array ) {
	var string;
	var len = array.length;
	if ( this.to$_depth > 0 ) { string = '[' + '...' + len; }
	else {
		string = '[' + ( array[ 0 ] ? this.to$( array [ 0 ] ) : this.empty$ );
		this.to$_depth++;
		if ( len <= 6 ) {
			for ( var index = 1; index < len; index++ ) { string += ', ' + this.to$( array[ index ] );}
		}
		else { string += ', ...+' + ( len - 1 );}
		this.to$_depth--;
	}
	return string + ']';
};
ux.extspect.util.StringOf.array$._name = 'ux.extspect.util.StringOf.array$';
// Array.map( ux.extspect.util.StringOf.to$ ) // Does not work with Arguments


// ---------- ux.extspect.util.StringOf.date$

// typeof( new Date ) -> 'object'

ux.extspect.util.StringOf.date$ = function ( date ) {
	if ( !date ) { date = this;}
	return 'Date' + this.leftBrace$ +
		date.getFullYear() + '.' +
		( date.getMonth() + 1 ) + '.' +
		date.getDate() + ' ' +
		date.toLocaleTimeString() +
		ux.extspect.util.StringOf.rightBrace$;
};
ux.extspect.util.StringOf.date$._name = 'ux.extspect.util.StringOf.date$';

// ---------- ux.extspect.util.StringOf.CONST

ux.extspect.util.StringOf.CONST = {};

ux.extspect.util.StringOf.CONST.KEY_BACKSPACE = 8;
ux.extspect.util.StringOf.CONST.KEY_ENTER_RETURN = 13;
ux.extspect.util.StringOf.CONST.KEY_PAUSE_BREAK = 19;
ux.extspect.util.StringOf.CONST.KEY_CAPS_LOCK = 20;
ux.extspect.util.StringOf.CONST.KEY_ESCAPE = 27;
ux.extspect.util.StringOf.CONST.KEY_PAGE_UP = 33;
ux.extspect.util.StringOf.CONST.KEY_PAGE_DOWN = 34;
ux.extspect.util.StringOf.CONST.KEY_END = 35;
ux.extspect.util.StringOf.CONST.KEY_HOME = 36;
ux.extspect.util.StringOf.CONST.KEY_LEFT_ARW = 37;
ux.extspect.util.StringOf.CONST.KEY_UP_ARW = 38;
ux.extspect.util.StringOf.CONST.KEY_RIGHT_ARW = 39;
ux.extspect.util.StringOf.CONST.KEY_DOWN_ARW = 40;

ux.extspect.util.StringOf.CONST.KEY_INSERT = 45;
ux.extspect.util.StringOf.CONST.KEY_DELETE = 46;

ux.extspect.util.StringOf.CONST.KEY_F1 = 112; 	// help
ux.extspect.util.StringOf.CONST.KEY_F2 = 113; 	// info page
ux.extspect.util.StringOf.CONST.KEY_F3 = 114;
ux.extspect.util.StringOf.CONST.KEY_F4 = 115;
ux.extspect.util.StringOf.CONST.KEY_F5 = 116; 	// index
ux.extspect.util.StringOf.CONST.KEY_F6 = 117;	// table of contents
ux.extspect.util.StringOf.CONST.KEY_F7 = 118;
ux.extspect.util.StringOf.CONST.KEY_F8 = 119;
ux.extspect.util.StringOf.CONST.KEY_F9 = 120;
ux.extspect.util.StringOf.CONST.KEY_F10 = 121;
ux.extspect.util.StringOf.CONST.KEY_F11 = 122;
ux.extspect.util.StringOf.CONST.KEY_F12 = 123;

ux.extspect.util.StringOf.CONST.KEY_HOME_FN = 172;
ux.extspect.util.StringOf.CONST.KEY_FAST_FORWARD = 176; 	// >>|
ux.extspect.util.StringOf.CONST.KEY_FAST_RVERSE = 177; 	// |<<
ux.extspect.util.StringOf.CONST.KEY_STOP = 178;
ux.extspect.util.StringOf.CONST.KEY_START_PAUSE = 179; 	// >/||

/*
 ux.extspect.util.StringOf.CONST.KEY_FTAB				= 9;
 ux.extspect.util.StringOf.CONST.KEY_FSPACE			= 32;
 Zero: { code: 48 , name: '0' } ,
 Semicolon: { code: 186 , name: ';' } ,
 Plus: { code: 187 , name: '+' } ,
 Comma: { code: 188 , name: ',' } ,
 Minus: { code: 189 , name: '-' } ,
 Period: { code: 190 , name: '.' } ,
 Slash: { code: 191 , name: '/' } ,
 Apostrophe: { code: 192 , name: '`' } ,
 SingleQuote: { code: 222 , name: '\'' }
 */

ux.extspect.util.StringOf.keyCode$ = function ( kyEvnt_num ) {
	switch ( kyEvnt_num ) {
		case this.CONST.KEY_BACKSPACE             :
			return 'KEY_BACKSPACE';
		case this.CONST.KEY_ENTER_RETURN        :
			return 'KEY_ENTER_RETURN';
		case this.CONST.KEY_PAUSE_BREAK        :
			return 'KEY_PAUSE_BREAK';
		case this.CONST.KEY_CAPS_LOCK            :
			return 'KEY_CAPS_LOCK';
		case this.CONST.KEY_ESCAPE                    :
			return 'KEY_ESCAPE';
		case this.CONST.KEY_PAGE_UP                :
			return 'KEY_PAGE_UP';
		case this.CONST.KEY_PAGE_DOWN            :
			return 'KEY_PAGE_DOWN';
		case this.CONST.KEY_END                        :
			return 'KEY_END';
		case this.CONST.KEY_HOME                    :
			return 'KEY_HOME';
		case this.CONST.KEY_LEFT_ARW            :
			return 'KEY_LEFT_ARW';
		case this.CONST.KEY_UP_ARW                :
			return 'KEY_UP_ARW';
		case this.CONST.KEY_RIGHT_ARW            :
			return 'KEY_RIGHT_ARW';
		case this.CONST.KEY_DOWN_ARW            :
			return 'KEY_DOWN_ARW';
		case this.CONST.KEY_INSERT                    :
			return 'KEY_INSERT';
		case this.CONST.KEY_DELETE                    :
			return 'KEY_DELETE';
		case this.CONST.KEY_F1                            :
			return 'KEY_F1F1';
		case this.CONST.KEY_F2                            :
			return 'KEY_F2';
		case this.CONST.KEY_F3                            :
			return 'KEY_F3';
		case this.CONST.KEY_F4                            :
			return 'KEY_F4';
		case this.CONST.KEY_F5                            :
			return 'KEY_F5';
		case this.CONST.KEY_F6                            :
			return 'KEY_F6';
		case this.CONST.KEY_F7                            :
			return 'KEY_F7';
		case this.CONST.KEY_F8                            :
			return 'KEY_F8';
		case this.CONST.KEY_F9                            :
			return 'KEY_F9';
		case this.CONST.KEY_F10                        :
			return 'KEY_F10';
		case this.CONST.KEY_F11                        :
			return 'KEY_F11';
		case this.CONST.KEY_F12                        :
			return 'KEY_F12';
		case this.CONST.KEY_HOME_FN                :
			return 'KEY_HOME_FN';
		case this.CONST.KEY_FAST_FORWARD    :
			return 'KEY_FAST_FORWARD';
		case this.CONST.KEY_FAST_RVERSE        :
			return 'KEY_FAST_RVERSE';
		case this.CONST.KEY_STOP                    :
			return 'KEY_STOP';
		case this.CONST.KEY_START_PAUSE        :
			return 'KEY_STRT_PAUSE';
		default                                                         :
			return 'no_kyEvnt_num';
	}
};
ux.extspect.util.StringOf.keyCode$._name = 'ux.extspect.util.StringOf.keyCode$';
