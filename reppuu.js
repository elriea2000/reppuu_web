function bitcount(src){
	var tbits=src;
	var count=0;
	for(;tbits!=0;tbits=tbits>>>1){
		count+=(tbits&1);
	}
	return count;
}
function bitrev(src,n){
	var dst=0;
	for(i=0;i<n;src>>>=1,dst<<=1,++i){
		dst|=src&1;
	}
	return dst>>1;
}

var Config=function(){
	this.knum=3;
	this.target=182;
	this.marginrate=1.1;
	this.maxmargin=2.0;
	this.apow=10;
	this.bonus=25;
	this.listnum=20;
	this.acpow=[];
	this.acnum=[];
	this.kvalidList=[];
	this.kvalidListInv={};
};

var ResRec=function(state,value){
	this.state=state;
	this.anum=0;
	this.value=value;
	
	this.calcAnum();
};
ResRec.prototype={
	compareTo: function(dst){
		if(this.anum==dst.anum && this.value==dst.value) return 0;
		else if(this.anum<dst.anum  || this.anum==dst.anum && this.value<dst.value) return 1;
		else return -1;
	},
	calcAnum: function(){
		this.anum=bitcount(this.state);
	}
};

var Optimizer=function(){
	this.config=new Config;
	this.dp=new Array(1<<(4*6));
	this.list=new BinaryHeap;
};
Optimizer.prototype={
	init: function(){
		this.config=new Config;
		this.dp=new Array(1<<(4*6));
		this.list=new BinaryHeap;
	},
	readData: function(){
		this.config.apow=parseInt(document.getElementById("apow").value,10);
		this.config.target=parseInt(document.getElementById("target").value,10);
		this.config.marginrate=+(document.getElementById("marginrate").value);
		this.config.maxmargin=+(document.getElementById("maxmargin").value);
		this.config.listnum=+(document.getElementById("listnum").value);
		
		this.config.kvalidList=[];
		this.config.kvalidListInv={};
		this.config.knum=0;
		for(i=0;i<6;++i){
			if(document.getElementById("kvalid"+(i+1)).checked){
				++this.config.knum;
				this.config.kvalidList.push(i);
				this.config.kvalidListInv[i]=this.config.knum-1; //‹tˆø‚«
			}
		}
		
		this.config.acpow=new Array(4*this.config.knum);
		this.config.acnum=[];
		
		for(r=0;r<6;++r){
			if(!(r in this.config.kvalidListInv)) continue;
		for(c=0;c<4;++c){
			var tstr="acvalid"+(r+1)+"_"+(c+1);
			var isValid=(document.getElementById(tstr).checked);
			tstr="acnum"+(r+1)+"_"+(c+1);
			this.config.acnum.push(isValid?parseInt(document.getElementById(tstr).value,10):0);
		}}
		
		this.calcAcpow();
	},
	
	calcAcpow: function(){
		for(i=0;i<4*this.config.knum;++i){
			this.config.acpow[i]=(this.config.acnum[i]>0?Math.floor(this.config.apow*Math.sqrt(this.config.acnum[i]))+25:0);
		}
	},

	calcAllPattern_r: function(head,state,value){
		if(head<4*this.config.knum){
			//—§‚Ä‚È‚¢
			this.calcAllPattern_r(head+1.,state,value);
			
			//—§‚Ä‚é
			if(this.config.acpow[head]>0 && value<Math.floor(this.config.maxmargin*this.config.target))
				this.calcAllPattern_r(head+1,state|(1<<head),value+this.config.acpow[head]);
		}
		else{
			this.dp[state]=value;
			var tval=value-Math.floor(this.config.target*this.config.marginrate);
			if(tval>0){
				var res=new ResRec(state,tval);
				this.list.push(res);
				if(this.list.size()>this.config.listnum) this.list.pop();
			}
		}
	},

	execute: function(){
		this.readData();
		this.calcAllPattern_r(0,0,0);
	},
	
	showAll: function(){
		var str="";
		
		for(r=0;r<this.config.knum;++r){
		for(c=0;c<4;++c){
			str+=""+ this.config.acpow[c+r*4] +" ";
		}
			str+="<BR />\n";
		}
		
		var tlist=this.list.clone();
		str+="target: "+Math.floor(this.config.target*this.config.marginrate)+"<BR />\n";
		while(!tlist.empty()){
			var res=tlist.pop();
			str+=("000000"+bitrev(res.state,4*this.config.knum).toString(16)).slice(-this.config.knum)+" "+bitcount(res.state)+" "+this.dp[res.state]+"<BR />\n";
		}
		document.getElementById("status").innerHTML=str;
	},
	
	showNext: function(){
		if(!this.list.empty()){
			var acsum=0;
			var res=this.list.pop();
			for(r=0;r<6;++r){
			for(c=0;c<4;++c){
				var id="actext"+ (r+1) +"_"+ (c+1);
				document.getElementById(id).innerHTML=((r in this.config.kvalidListInv)&&(res.state&(1<<(c+this.config.kvalidListInv[r]*4)))!=0?"š":"");
			}}
			
			document.getElementById("totalacpow").innerHTML="total: "+(res.value+Math.floor(this.config.target*this.config.marginrate))+" | remain: "+this.list.size();
		}
		else{
			alert("last of the list.");
		}
	},
	
	clearShow: function(){
		document.getElementById("totalacpower").innerHTML="";
		document.getElementById("status").innerHTML="";
	}
};


var optimizer=new Optimizer;

function onClick_form1_execute(){
	optimizer.init();
	optimizer.execute();
	//optimizer.show();
	optimizer.showAll();
	optimizer.showNext();
}
function onClick_form1_next(){
	optimizer.showNext();
}
function onClick_form1_acencode(id){
	var idcode=id.slice(-1);
	var str="";
	str+=document.getElementById("kname"+idcode).value;
	str+=","
	str+=document.getElementById("acnum"+idcode+"_1").value;
	str+=","
	str+=document.getElementById("acnum"+idcode+"_2").value;
	str+=","
	str+=document.getElementById("acnum"+idcode+"_3").value;
	str+=","
	str+=document.getElementById("acnum"+idcode+"_4").value;
	document.getElementById("accode"+idcode).value=str;
}
function onClick_form1_acdecode(id){
	var idcode=id.slice(-1);
	var str=document.getElementById("accode"+idcode).value.concat();
	var cols=str.split(",");
	document.getElementById("kname"+idcode).value=cols[0];
	document.getElementById("acnum"+idcode+"_1").value=cols[1];
	document.getElementById("acnum"+idcode+"_2").value=cols[2];
	document.getElementById("acnum"+idcode+"_3").value=cols[3];
	document.getElementById("acnum"+idcode+"_4").value=cols[4];
	document.getElementById("kvalid"+idcode).checked=true;
	document.getElementById("acvalid"+idcode+"_1").checked=true;
	document.getElementById("acvalid"+idcode+"_2").checked=true;
	document.getElementById("acvalid"+idcode+"_3").checked=true;
	document.getElementById("acvalid"+idcode+"_4").checked=true;
}

function onClick_form1_acencodeall(){
	var str="";
	for(r=0;r<6;++r){
		var idcode=""+(r+1);
		str+="{";
		str+=document.getElementById("kname"+idcode).value;
		str+=",";
		str+=document.getElementById("acnum"+idcode+"_1").value;
		str+=",";
		str+=document.getElementById("acnum"+idcode+"_2").value;
		str+=",";
		str+=document.getElementById("acnum"+idcode+"_3").value;
		str+=",";
		str+=document.getElementById("acnum"+idcode+"_4").value;
		str+="}";
	}
	document.getElementById("accodeall").value=str;
}
function onClick_form1_acdecodeall(){
	var str=document.getElementById("accodeall").value.concat();
	var rows1=str.split("{");
	for(i=0;i<6;++i){
		var idcode=""+(i+1);
		var rows2=rows1[i+1].split("}");
		var cols=rows2[0].split(",");
		document.getElementById("kname"+idcode).value=cols[0];
		document.getElementById("acnum"+idcode+"_1").value=cols[1];
		document.getElementById("acnum"+idcode+"_2").value=cols[2];
		document.getElementById("acnum"+idcode+"_3").value=cols[3];
		document.getElementById("acnum"+idcode+"_4").value=cols[4];
		document.getElementById("kvalid"+idcode).checked=(cols[0].length!=0);
		document.getElementById("acvalid"+idcode+"_1").checked=true;
		document.getElementById("acvalid"+idcode+"_2").checked=true;
		document.getElementById("acvalid"+idcode+"_3").checked=true;
		document.getElementById("acvalid"+idcode+"_4").checked=true;
	}
}

