class key_operation{
	constructor(operation,index){
		this.opr=operation;
		this.idx=index;
	}
	get_index(){
		return this.idx;
	}
	get_symbol(){
		return this.opr;
	}
}
class priority_operations{
	constructor(){
		this.array=[];
		this.translate={
			"*":1,
			"/":1,
			"+":2,
			"-":2,
		}
	}
	get(idx){
		return this.array[idx];
	}
	translate_symbol(symbol){
		return this.translate[symbol];
	}
	translate_index(idx){
		return this.translate_symbol(this.get(idx).get_symbol());
	}
	swap_idx(idx1,idx2){
		var temp=this.array[idx1];
		this.array[idx1]=this.array[idx2];
		this.array[idx2]=temp;
	}
	empty(){
		return this.array.length==0;
	}

	shiftUp(index){
		if(!index||this.translate_index(Math.floor((index-1)/2))<this.translate_index(index))
			return;
		this.swap_idx(index,Math.floor((index-1)/2));
		this.shiftUp(Math.floor((index-1)/2));
	}
	shiftDw(index){
		var temp=index;
		if(index*2+1<this.array.length&&this.translate_index(index)>this.translate_index(index*2+1))
			temp=index*2+1;
		if(index*2+2<this.array.length&&this.translate_index(temp)>this.translate_index(index*2+2))
			temp=index*2+2;
		if(temp!=index){
			this.swap_idx(index,temp);
			this.shiftDw(temp);
		}
	}

	push_back(operation,index){
		var keys=new key_operation(operation,index);
		this.array.push(keys);
		this.shiftUp(this.array.length-1);
	}
	get_first(){
		var value=this.array[0];
		this.array[0]=this.array.at(-1);
		this.array.splice(this.array.length-1,1);
		this.shiftDw(0);

		return value;
	}

	display(){
		var str="[ ";
		for(var i=0;i<this.array.length;++i){
			str+="[ "+this.array[i].get_symbol()+" "+this.array[i].get_index()+" ] ";
		}
		str+="]";
		console.log(str);
	}
}

/*
function validate_input(user_input){
	var numbers=[];
	var operations=[];
	for(var i=0;i<user_input.length;++i){
		if(user_input[i].charCodeAt(0)==32)
			continue;
		var ascii_value=user_input[i].charCodeAt(0);
		if(ascii_value==42){ // *
			operations.push
		if(ascii_value<48||ascii_value>57){
			str="";
			break;
		}
		str+=user_input[i];
	}
	console.log(str);
}*/
function fish(){
	/*
	var input=document.getElementById("user_input");
	validate_input(input.value);*/
	var tst=new priority_operations();
	tst.push_back("+",0);
	tst.display();
	tst.push_back("*",0);
	tst.display();
	tst.push_back("/",0);
	tst.display();
	tst.push_back("-",0);
	tst.display();

	while(!tst.empty()){
		var ext=tst.get_first();
		console.log(ext.get_symbol()+" "+ext.get_index());
		tst.display();
	}
}
