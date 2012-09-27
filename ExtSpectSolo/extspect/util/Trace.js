Ext.define( 'extspect.util.Trace', { } );

Trace = {};

Trace.ok = true;

Trace.diamondChar = String.fromCharCode( 0x2666 );

// ---------- Trace.start

// If value_ is supplied , Trace.start logs the function list followed by the value
// If there is no value_ , Trace.start logs the just function call list
// and the names and values of the arguments

Trace.start =
	function ( value ) {
		if ( Trace.ok )
		{
			var argmnts;
			var fnctn = this.callingFn();
			if ( value )
			{ value = this._Fd_fCallers$( fnctn ) + ' : ' + StringOf.to$( value );}
			else {
				if ( fnctn )
				{
					argmnts = fnctn.arguments;
					value = this._Call_fCallersNVs$( argmnts );
				}
				else { value = this.start._name + ', callingFn() = ' + fnctn; }
			}
			console.group( value );
		}
	};
Trace.start._name = 'Trace.start';

// ---------- Trace.end

Trace.end =
	function ( value, callingFn ) {
		if ( Trace.ok )
		{
			console.groupEnd();
			if ( value )
			{
				callingFn = callingFn || this.callingFn();
				var string = 'End : ' + this._SaV_fCallersVlu$( callingFn.arguments, value );
				console.log( string );
			}
		}
		return value;
	};
Trace.end._name = 'Trace.end';

// ---------- Trace.log

/* Prints the function name & the arguments passed into Trace.log.
 The even numbered arguments ( 0 , 2 , 4 ... ) should be strings.
 */

Trace.vars =
	function () {
		if ( Trace.ok )
		{
			console.log( Trace._A_fCallersNVs$( arguments ) );
		}
	};
Trace.vars._name = 'Trace.vars';

// ---------- Trace.callingFn

Trace.callingFn =
	function () { return arguments.callee.caller.caller; };
Trace.callingFn._name = 'Trace.callingFn';

// ---------- Trace.callerFn

Trace.callerFn =
	function ( argmnts ) {
		var fnctn;
		if ( 'callee' in argmnts )
		{
			var callee = argmnts.callee;
			if ( 'caller' in callee )
			{
				fnctn = callee.caller;
			}
		}
		return fnctn;
	};
Trace.callerFn._name = 'Trace.callerFn';

// ---------- Trace.callerName

Trace.callerName =
	function ( argmnts ) {
		var name = StringOf.empty$;
		var fnctn = Trace.callerFn( argmnts );
		if ( fnctn )
		{ name = StringOf.functionName( fnctn ); }
		return name;
	};
Trace.callerName._name = 'Trace.callerName';

// ---------- Trace.functionArguments$

/* Returns a string of fnctn's parameter names */

Trace.functionArguments$ =
	function ( fnctn ) {
		if ( !( fnctn instanceof Function ) )
		{
			console.error( this.functionArguments$._name + ', the following is not a function :', fnctn );
			return null;
		}

		var fnctn$ = fnctn.toString();
		var fnctnNameStrtPos = 'function '.length;
		var fnctnArgsStartPos = fnctn$.indexOf( '(', fnctnNameStrtPos ) + 1;

		if ( fnctnArgsStartPos === -1 ) // -1 means string not found. This should never happen.
		{
			console.error( this.functionArguments$._name + ', opening parens not found for :', fnctn );
			return null;
		}
		else {    // endPos = the start of the parameters list after the function name
			var fnctnArgsEndPos = fnctn$.indexOf( ')', fnctnArgsStartPos );
			return fnctn$.substring( fnctnArgsStartPos, fnctnArgsEndPos );
		}
	};
Trace.functionArguments$._name = 'Trace.functionArguments$';

// ---------- Trace.argumentNames

/* Returns an array of variable names used as arguments to fnctn */

Trace.argumentNames =
	function ( fnctn ) {
		var strings = this.functionArguments$( fnctn ).split( ',' );
		strings.forEach( this.nTrimStringsInArray );
		return strings;
	};
Trace.argumentNames._name = 'Trace.argumentNames';

/* I put an underscore in front of the function names simply because WebStorm
 would complain about calling 'constructors' (functions starting with a capital letter)
 without using new.
 $_argmnts = a string or arguments array
 Ad	=	the input is an arguments array , followed by an optional depth
 Sad	= the input is a String or arguments array , followed by an optional depth
 Fd	= the input is a Function , followed by an optional depth
 */

// ---------- Trace.nTrimStringsInArray

// Destructively trims spaces from each string in ary

Trace.nTrimStringsInArray =
	function ( string, index, array ) { array[ index ] = Trace.trimSpaces10$( string );};
Trace.nTrimStringsInArray._name = 'Trace.nTrimStringsInArray';

// ---------- Trace.trimSpaces10$

// http://blog.stevenlevithan.com/archives/faster-trim-javascript

Trace.trimSpaces10$ =
	function ( string ) {
		var whiteSpaces$ = ' \t\n\u00A0';// u00A0 = 160 = nbsp

		// if the char at i is not in the list of whitespaces ,
		//		string = string.substring( i ) , stop
		for ( var i = 0; i < string.length; i++ )
		{
			if ( whiteSpaces$.indexOf( string.charAt( i ) ) === -1 )
			{
				string = string.substring( i );
				break;
			}
		}
		for ( i = string.length - 1; i >= 0; i-- )
		{
			if ( whiteSpaces$.indexOf( string.charAt( i ) ) === -1 )
			{
				string = string.substring( 0, i + 1 );
				break;
			}
		}
		return ( whiteSpaces$.indexOf( string.charAt( 0 ) ) === -1 ) ? string : StringOf.empty$;
	};
Trace.trimSpaces10$._name = 'StringOf.trimSpaces10$';

// ---------- Trace._Saf_name

// $_argmnts_fnctn_ means that the input can be argumnts , a fnctn , a string , or null

// this was called func_name

Trace._Saf_name =
	function ( $_argmnts__fnctn__null ) {
		if ( typeof( $_argmnts__fnctn__null ) === 'string' )
		{ return $_argmnts__fnctn__null;}

		if ( $_argmnts__fnctn__null === null )
		{ return '_Saf_name=null'; }

		if ( 'callee' in $_argmnts__fnctn__null ) // input is an arguments object
		{ return StringOf.functionName( $_argmnts__fnctn__null.callee );}

		// this should be a function
		return StringOf.functionName( $_argmnts__fnctn__null );
	};
Trace._Saf_name._name = 'Trace._Saf_name';

// ---------- _Ad_callers$

/* Returns <>caller<>caller ... */
/* 3/12 Returns the callers of a function
 Trace._Ad_callers$ =
 function ( argmnts , depth )
 {	var name = this.callerName( argmnts )
 var argmnts_caller_ = this.callerFn( argmnts )
 return ( name ? ( this.diamondChar + name ) : StringOf.empty$ ) +
 ( ( argmnts_caller_  &&
 argmnts_caller_.arguments &&
 ( depth > 0 )
 ) ?
 this._Ad_callers$( argmnts_caller_.arguments , depth - 1 ) :
 StringOf.empty$
 )
 }
 Trace._Ad_callers$._name = 'Trace._Ad_callers$'*/

// ---------- Fd_fCallers$

// Returns fnctn<>caller<>caller ...

Trace._Fd_fCallers$ =
	function ( fnctn, depth ) { return StringOf.functionName( fnctn ); };
Trace._Fd_fCallers$._name = 'Trace._Fd_fCallers$';

// ---------- Trace._Call_fCallersNVs$

/* Returns argmnts's function name , along with all of
 the function's arg_names and their values
 The arg_names come from Trace.argumentNames( fnctn ) */

Trace._Call_fCallersNVs$ =
	function ( argmnts, depth ) {
		var fnctn = argmnts.callee;
		var len = argmnts.length;
		var string = this._Fd_fCallers$( fnctn, depth );
		var argNames = this.argumentNames( fnctn );
		for ( var index = 0; index < len; index++ )
		{ string += ', ' + argNames[ index ] + ' = ' + StringOf.to$( argmnts[ index ] ); }
		return string;
	};
Trace._Call_fCallersNVs$._name = 'Trace._Call_fCallersNVs$';

// ---------- Sad_fCallers$

/* Returns the string , or callee<>caller<>caller ... */

Trace._Sad_fCallers$ =
	function ( $_argmnts, depth ) {
		if ( typeof( $_argmnts ) === 'string' )
		{ return $_argmnts; }

		return this._Saf_name( $_argmnts );
	};
Trace._Sad_fCallers$._name = 'Trace._Sad_fCallers$';

// ---------- Trace._SaV_fCallersVlu$

Trace._SaV_fCallersVlu$ =
	function ( $_argmnts, value ) { return this._Sad_fCallers$( $_argmnts ) + ' : ' + StringOf.to$( value ); };
Trace._SaV_fCallersVlu$._name = 'Trace._SaV_fCallersVlu$';

// ---------- Trace._A_fCallersNVs$

/* Returns the function name & the arguments passed into
 the function calling A_fCallersNVs$
 The even numbered arguments ( 0 , 2 , 4 , ... )  should be strings */

Trace._A_fCallersNVs$ =
	function ( argmnts ) {
		var fnctn = argmnts.callee;
		var len = argmnts.length ;
		var string = this._Fd_fCallers$( fnctn.caller );

		for ( var index = 0; index < len; index++ )
		{ string += ', ' + argmnts[ index ] + ' = ' + StringOf.to$( argmnts[ ++index ] ); }
		return string;
	};
Trace._A_fCallersNVs$._name = 'Trace._A_fCallersNVs$';
