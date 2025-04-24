const translate={
	"*":1,
	"/":1,
	"+":2,
	"-":2
}
function sleep(milis){
	console.log(milis);
	return new Promise(resolve=>setTimeout(resolve,milis));
}

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
		this.translate=translate;
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
		if(!index||this.translate_index(Math.floor((index-1)/2))>this.translate_index(index))
			return;
		this.swap_idx(index,Math.floor((index-1)/2));
		this.shiftUp(Math.floor((index-1)/2));
	}
	shiftDw(index){
		var temp=index;
		if(index*2+1<this.array.length&&this.translate_index(index)<this.translate_index(index*2+1))
			temp=index*2+1;
		if(index*2+2<this.array.length&&this.translate_index(temp)<this.translate_index(index*2+2))
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
		if(this.empty())
			return null;

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

function validate_input(user_input){
	var keys_translate=Object.keys(translate);
	var state=0; // 0 for number and 1 for operations
	for(var i=0;i<user_input.length;++i){
		if(user_input[i].charCodeAt(0)==32)
			continue;
		var ascii_value=user_input[i].charCodeAt(0);
		if(keys_translate.includes(user_input[i])){
			state=0;
			continue;
		}
		if(ascii_value<48||ascii_value>57){
			return 0;
		}
		state=1;
	}
	return state;
}
function get_operations(user_input){
	var keys_translate=Object.keys(translate);
	var operations=new priority_operations();
	var index_operations=0;
	for(var i=0;i<user_input.length;++i){
		if(!keys_translate.includes(user_input[i]))
			continue;
		operations.push_back(user_input[i],index_operations);
		++index_operations;
	}
	return operations;
}
function get_numbers(user_input){
	var keys_translate=Object.keys(translate);
	var numbers=[""];
	var index_numbers=0;
	for(var i=0;i<user_input.length;++i){
		if(keys_translate.includes(user_input[i])){
			++index_numbers;
			numbers.push("");
			continue;
		}
		if(user_input[i].charCodeAt(0)<48||user_input[i].charCodeAt(0)>57)
			continue;
		numbers[index_numbers]+=user_input[i];
	}
	return numbers;
}


async function fish(){
	var input=document.getElementById("user_input");
	var output=document.getElementById("output");

	output.classList.remove("animation_rotate");
	if(!validate_input(input.value)){
		output.style.color="red"
		output.textContent="Please, insert a valid operation...";
		return;
	}
	output.textContent="processing the calcule..";
	output.classList.add("animation_rotate");
	output.style.color="blue";

	//
	//await sleep(Math.floor(Math.random()*5000));
}
