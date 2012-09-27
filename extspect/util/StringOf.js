Ext.define( 'extspect.util.StringOf', { } );

// ---------- StringOf constants

StringOf = {};

StringOf.empty$ = '';

// StringOf.doubleQuoteChar = '"';
StringOf.leftDoubleQuoteChar = '"'; // String.fromCharCode( 0x201c )
StringOf.rightDoubleQuoteChar = '"'; //String.fromCharCode( 0x201d )
StringOf.leftSingleQuoteChar = "'"; // String.fromCharCode( 0x2018 )
StringOf.rightSingleQuoteChar = "'";// String.fromCharCode( 0x2019 )

StringOf.leftBrace$ = '{';		// String.fromCharCode( 0x276e )
StringOf.rightBrace$ = '}';     // String.fromCharCode( 0x276f )

// ---------- StringOf.ellipsis$

// TODO: 30 needs to be a function of the width of the panel
// Ext.Viewport.getWindowWidth() / 2
// or ExtSpect.getColumnWidth()
StringOf.ellipsis$ = function ( string ) { return Ext.String.ellipsis( string, 50, true ); };
StringOf.ellipsis$._name = 'StringOf.ellipsis$';

// ---------- StringOf.to$

StringOf.to$ = function ( value ) {
	var type$ = typeof( value );
	// console.log( 'StringOf.to$ 0: ' + type$ , value );

	if ( value === undefined )
	{ return 'undefined'; }

	if ( value === null )
	{ return 'null'; }

	switch ( type$ )
	{    // '123' instanceof String -> false
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

	return this.object$( value, type$ );
};
StringOf.to$._name = 'StringOf.to$';

// ---------- StringOf.object$

StringOf.object$ = function ( object, type$ ) {
	if ( !( object instanceof Object ) )
	{
		console.error( StringOf.functionName( arguments.callee ) + ': object =', object );
		debugger;
	}
	else {
		var data$ = object.id || object.name || '';

		if ( object.hasOwnProperty( "$className" ) )
		{
			data$ = this.lastPartOfName( object.$className || data$, 2 );
			// if ( ! object.hasOwnProperty( "superclass" ) ) Ext.Base
			// {	console.warn( 'StringOf.object$, $className but no superclass, ' , object ) }
		}

		type$ = object.type || type$;

		if ( object.hasOwnProperty( "superclass" ) ) // this is a Sencha template class or an $owner
		{ type$ = 'TC'; }
		else
		// Ext.getClassName(), Ext.ClassManager.getDisplayName( Mixed object )
		{
			if ( ( "xtype" in object ) && ( object instanceof Ext.Base ) )
			{
				data$ = object.id || object.xtype;
				var text = object._text; // Ext.Button
				if ( text )
				{ data$ = data$ + '&lt;' + text + '&gt;';}
				return data$;
			}
			else
			// Nodes : localName, nodeName, nodeValue, childNodes, parentNodes, attributes, textContent
			// Element : tagName, getAttribute( 'name' )
			// HTMLElements : id, title, className
			{
				if ( "localName" in object ) // Node
				{
					type$ = object.localName || object.nodeName || object.tagName || this.nodeType$( object.nodeType );
					data$ = object.nodeValue || object.id || data$ || object.src || object.href;
					if ( data$ )
					{ data$ = this.lastPartOfName( data$, 2, '/' ); }
					// if ( "getAttribute" in object ) // Element
					// {	data$ = object.getAttribute( 'name' ) || data$ }
				}
				else {
					if ( "$className" in object ) // Sencha
					{ type$ = this.lastPartOfName( object.$className || type$ );}
					else { type$ = this.constructorName( object );}
				}
			}
		}
	}

	if ( !data$ )
	{ data$ = this.objectData$( object ); }
	else { data$ = this.quote$( data$ );}

	var string = ( object instanceof Element ) ?
		this.element$( type$, data$ ) :
		this.embrace$( type$, data$ );
	return string;
};
StringOf.object$._name = 'StringOf.object$';

// ---------- StringOf.quote$

StringOf.quote$ = function ( data$ ) { return this.leftSingleQuoteChar + data$ + this.rightSingleQuoteChar;};
StringOf.quote$._name = 'StringOf.quote$';

// ---------- StringOf.embrace$

StringOf.embrace$ = function ( type$, data$ ) {
	var string = this.leftBrace$ + data$ + this.rightBrace$;
	if ( type$ ) { string = type$ + string;}
	return string;
};
StringOf.embrace$._name = 'StringOf.embrace$';

// ---------- StringOf.element$

StringOf.element$ = function ( type$, data$ ) { return '&lt;' + type$ + ' ' + data$ + '&gt;';};
StringOf.element$._name = 'StringOf.element$';

// ---------- StringOf.propertyCount

StringOf.propertyCount = function ( object ) {
	var count = 0;
	for ( var property in object )
	{ count++; }
	return count;
};
StringOf.propertyCount._name = 'propertyCount.object$';

// ---------- StringOf.ownPropertyCount

/*
 StringOf.ownPropertyCount = function ( object )
 {	var count = 0
 for (	var property in object )
 {	if ( object.hasOwnProperty( property ) )
 {	count ++ }
 }
 return count
 }
 StringOf.ownPropertyCount._name = 'ownPropertyCount.object$'
 */

// ---------- StringOf.objectData$

StringOf.to$_depth = 0;

StringOf.objectData$ = function ( object ) {
	var propertyCount = 0;
	var methodCount = 0;
	var data$;
	this.to$_depth++;
	if ( this.to$_depth > 5 ) // Ext.browser.version , Ext.DomHelper
	{ return '...etc...'; }

	for ( var property in object )
	{
		if ( object[ property ] instanceof Function )
		{ methodCount++;}
		else { propertyCount++;}
	}

	if ( ( propertyCount === 0 ) &&
		( methodCount === 0 )
		)
	{ data$ = '0...'; }
	else {
		if ( ( propertyCount <= 4 ) && ( propertyCount > 0 ) )
		{ data$ = this.objectProperties$( object ); }
		else {
			data$ = '...' + propertyCount + 'p/' + methodCount + 'm';
			//	( methodCount ? ( 'p/' + methodCount + 'm' ) : StringOf.empty$ )
		}
	}
	this.to$_depth--;
	return data$;
};
StringOf.objectData$._name = 'StringOf.object$';

// ---------- StringOf.objectProperties$

StringOf.objectProperties$ = function ( object ) {
	var string = '';
	for ( var property in object )
	{
		var value = object[ property ];
		if ( !( value instanceof Function ) )
		{ string += property + ': ' + this.to$( value ) + ', '; }
	}
	string = string.substring( 0, string.length - 2 );
	string = this.ellipsis$( string );
	return string;
};
StringOf.objectProperties$._name = 'StringOf.object2$';

// ---------- StringOf.nodeType$

// domTraces.js

StringOf.nodeType$ = function ( nodeTypeInteger ) {
	switch ( nodeTypeInteger )
	{
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
StringOf.nodeType$._name = 'StringOf.nodeType$';

// ---------- StringOf.functionName

StringOf.functionName = function ( fnctn ) {
	if ( !( fnctn instanceof Function ) )
	{
		console.error( 'StringOf.functionName : fnctn = ', fnctn );
		return null;
	}
	var name = fnctn.name || fnctn._name || fnctn.displayName || fnctn.$name || 'function';
	return StringOf.lastPartOfName( name );
};
StringOf.functionName._name = 'StringOf.functionName';

// ---------- StringOf.constructorName

// determine the type$ from the object's constuctor
// The function name of a config = ''

StringOf.constructorName = function ( value ) {
	var fnctnName = null;
	var fnctn = value.constructor;

	if ( fnctn instanceof Function )
	{ fnctnName = this.functionName( fnctn ); }

	if ( fnctnName ) {
		var index = fnctnName.indexOf( '#constructor' ); // Sencha Ext
		if ( 0 < index )
		{ fnctnName = fnctnName.substring( 0, index ); }
		else {
			if ( fnctnName === 'Object' )
			{ fnctnName = 'O'; }
			else {
				if ( fnctnName === 'function' )
				{ fnctnName = this.empty$;}
			}
		}
	}
	return fnctnName;
};
StringOf.constructorName._name = 'StringOf.determineConstructorName';

// ---------- StringOf.lastPartOfName

// if the name contains dots , take the last part of the name

StringOf.lastPartOfName = function ( name, count, separator ) {
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
StringOf.lastPartOfName._name = 'StringOf.lastPartOfName';

// ---------- StringOf.array$

StringOf.array$ = function ( array ) {
	var string;
	var len = array.length;
	if ( this.to$_depth > 0 )
	{ string = '[' + '...' + len; }
	else {
		string = '[' + ( array[ 0 ] ? this.to$( array [ 0 ] ) : this.empty$ );
		this.to$_depth++;
		if ( len <= 6 ) {
			for ( var index = 1; index < len; index++ )
			{ string += ', ' + this.to$( array[ index ] );}
		}
		else { string += ', ...+' + ( len - 1 );}
		this.to$_depth--;
	}
	return string + ']';
};
StringOf.array$._name = 'StringOf.array$';
// Array.map( StringOf.to$ ) // Does not work with Arguments

// ---------- StringOf.date$

// typeof( new Date ) -> 'object'

StringOf.date$ = function ( date ) {
	if ( !date ) { date = this;}
	return 'Date' + this.leftBrace$ +
		date.getFullYear() + '.' +
		( date.getMonth() + 1 ) + '.' +
		date.getDate() + ' ' +
		date.toLocaleTimeString() +
		StringOf.rightBrace$;
};
StringOf.date$._name = 'StringOf.date$';

// ---------- StringOf.CONST

StringOf.CONST = {};

StringOf.CONST.KEY_BACKSPACE = 8;
StringOf.CONST.KEY_ENTER_RETURN = 13;
StringOf.CONST.KEY_PAUSE_BREAK = 19;
StringOf.CONST.KEY_CAPS_LOCK = 20;
StringOf.CONST.KEY_ESCAPE = 27;
StringOf.CONST.KEY_PAGE_UP = 33;
StringOf.CONST.KEY_PAGE_DOWN = 34;
StringOf.CONST.KEY_END = 35;
StringOf.CONST.KEY_HOME = 36;
StringOf.CONST.KEY_LEFT_ARW = 37;
StringOf.CONST.KEY_UP_ARW = 38;
StringOf.CONST.KEY_RIGHT_ARW = 39;
StringOf.CONST.KEY_DOWN_ARW = 40;

StringOf.CONST.KEY_INSERT = 45;
StringOf.CONST.KEY_DELETE = 46;

StringOf.CONST.KEY_F1 = 112; 	// help
StringOf.CONST.KEY_F2 = 113; 	// info page
StringOf.CONST.KEY_F3 = 114;
StringOf.CONST.KEY_F4 = 115;
StringOf.CONST.KEY_F5 = 116; 	// index
StringOf.CONST.KEY_F6 = 117;	// table of contents
StringOf.CONST.KEY_F7 = 118;
StringOf.CONST.KEY_F8 = 119;
StringOf.CONST.KEY_F9 = 120;
StringOf.CONST.KEY_F10 = 121;
StringOf.CONST.KEY_F11 = 122;
StringOf.CONST.KEY_F12 = 123;

StringOf.CONST.KEY_HOME_FN = 172;
StringOf.CONST.KEY_FAST_FORWARD = 176; 	// >>|
StringOf.CONST.KEY_FAST_RVERSE = 177; 	// |<<
StringOf.CONST.KEY_STOP = 178;
StringOf.CONST.KEY_START_PAUSE = 179; 	// >/||

/*
 StringOf.CONST.KEY_FTAB				= 9;
 StringOf.CONST.KEY_FSPACE			= 32;
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

StringOf.keyCode$ = function ( kyEvnt_num ) {
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
StringOf.keyCode$._name = 'StringOf.keyCode$';
