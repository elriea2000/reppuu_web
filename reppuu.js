/*
 * 制空値最適化プログラム“烈風拳であります！”ブラウザ版 v0.3
 * This source and related resources are available under BSD License.
 * Copyright (c) 2016-, suzuryo All rights reserved.
 */

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

var KanData=function(name,id,acnum){
	this.name=name;
	this.id=id;
	this.acnum=acnum;
}
var KanDatabase={
	"Akagi" :			new KanData("赤城",	100006,	[18,18,27,10]),
	"Kaga" :			new KanData("加賀",	100007,	[18,18,45,12]),
	"Souryuu" :		new KanData("蒼龍",	100008,	[12,27,18,7]),
	"Hiryuu" :			new KanData("飛龍",	100009,	[12,27,18,7]),
	"Shoukaku" :		new KanData("翔鶴",	100106,	[21,21,21,12]),
	"Zuikaku" :			new KanData("瑞鶴",	100107,	[21,21,21,12]),
	"Taihou" :			new KanData("大鳳",	100153,	[18,18,18,7]),
	"Unryuu" :			new KanData("雲龍",	100201,	[18,24,3,6]),
	"Amagi" :			new KanData("天城",	100202,	[18,24,3,6]),
	"Katsuragi" :		new KanData("葛城",	100203,	[18,24,3,6]),
	"GrafZeppelin" :		new KanData("Graf Zeppelin",	100232,	[20,13,10,0]),

	"Akagi_c" :			new KanData("赤城改",	110006,	[20,20,32,10]),
	"Kaga_c" :			new KanData("加賀改",	110007,	[20,20,46,12]),
	"Souryuu_c" :		new KanData("蒼龍改",	110008,	[18,27,18,10]),
	"Hiryuu_c" :		new KanData("飛龍改",	110009,	[18,27,18,10]),
	"Shoukaku_c" :		new KanData("翔鶴改",	110106,	[24,24,24,12]),
	"Zuikaku_c" :		new KanData("瑞鶴改",	110108,	[24,24,24,12]),
	"Taihou_c" :		new KanData("大鳳改",	110156,	[30,24,24,8]),
	"Unryuu_c" :		new KanData("雲龍改",	110206,	[18,21,27,3]),
	"Amagi_c" :		new KanData("天城改",	110229,	[18,21,27,3]),
	"Katsuragi_c" :		new KanData("葛城改",	110230,	[18,21,27,3]),
	"GrafZeppelin_c" :	new KanData("Graf Zeppelin改",	110232,	[30,13,10,3]),

	"Souryuu_cc" :		new KanData("蒼龍改二",	120197,	[18,35,20,6]),
	"Hiryy_cc" :		new KanData("飛龍改二",	120196,	[18,36,22,3]),
	"Shoukaku_cc" :		new KanData("翔鶴改二",	120261,	[27,27,27,12]),
	"Shoukaku_cc2" :	new KanData("翔鶴改二甲",	121266,	[34,21,12,9]),
	"Zuikaku_cc" :		new KanData("瑞鶴改二",	120262,	[28,26,26,13]),
	"Zuikaku_cc2" :		new KanData("瑞鶴改二甲",	121267,	[34,24,12,6]),

	"Houshou" :		new KanData("鳳翔",	200025,	[8,11,0,0]),
	"Ryuujou" :		new KanData("龍驤",	200030,	[9,24,5,0]),
	"Hiyou" :			new KanData("飛鷹",	200065,	[12,18,18,10]),
	"Jun-you" :		new KanData("隼鷹",	200066,	[12,18,18,10]),
	"Shouhou" :		new KanData("祥鳳",	200094,	[18,9,3,0]),
	"Zuihou" :			new KanData("瑞鳳",	200112,	[18,9,3,0]),
	"Chitose_3" :		new KanData("千歳航",	202104,	[21,9,6,0]),
	"Chiyoda_3" :		new KanData("千代田航",	202105,	[21,9,6,0]),
	"Ryuuhou" :		new KanData("龍鳳",	200185,	[18,7,6,0]),

	"Houshou_c" :		new KanData("鳳翔改",	210025,	[14,16,12,0]),
	"Ryuujou_c" :		new KanData("龍驤改",	210030,	[9,24,5,5]),
	"Hiyou_c" :			new KanData("飛鷹改",	210065,	[18,18,18,12]),
	"Jun-you_c" :		new KanData("隼鷹改",	210066,	[18,18,18,12]),
	"Shouhou_c" :		new KanData("祥鳳改",	210094,	[18,12,12,6]),
	"Zuihou_c" :		new KanData("瑞鳳改",	210113,	[18,12,12,6]),
	"Chitose_3c" :		new KanData("千歳航改",	212104,	[24,16,8,8]),
	"Chiyoda_3c" :		new KanData("千代田航改",	212105,	[24,16,8,8]),
	"Ryuuhou_c" :		new KanData("龍鳳改",	210190,	[21,9,9,6]),

	"Ryuujou_cc" :		new KanData("龍驤改二",	220157,	[18,28,6,3]),
	"Jun-you_cc" :		new KanData("隼鷹改二",	220208,	[24,18,20,4]),
	"Chitose_3cc" :		new KanData("千歳航改二",	220121,	[24,16,11,8]),
	"Chiyoda_3cc" :		new KanData("千代田航改二",	220122,	[24,16,11,8]),
	
	"Akitsumaru_c" :		new KanData("あきつ丸改",	210166,	[8,8,8,0])
};


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
	this.orderedlist=[];
};
Optimizer.prototype={
	init: function(){
		this.config=new Config;
		this.dp=new Array(1<<(4*6));
		this.list=new BinaryHeap;
		this.orderedlist=[];
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
				this.config.kvalidListInv[i]=this.config.knum-1; //逆引き
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
			//立てない
			this.calcAllPattern_r(head+1.,state,value);
			
			//立てる
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
			this.orderedlist.push(res);
		}
		document.getElementById("status").innerHTML=str;
	},
	
	showNext: function(){
		if(this.orderedlist.length>0){
			var acsum=0;
			var res=this.orderedlist.pop(); //後ろから取る
			//var res=this.orderedlist.shift(); //前から取る
			for(r=0;r<6;++r){
			for(c=0;c<4;++c){
				var id="actext"+ (r+1) +"_"+ (c+1);
				document.getElementById(id).innerHTML=((r in this.config.kvalidListInv)&&(res.state&(1<<(c+this.config.kvalidListInv[r]*4)))!=0?"★":"");
			}}
			
			document.getElementById("totalacpow").innerHTML="total: "+(res.value+Math.floor(this.config.target*this.config.marginrate))+" | remain: "+this.orderedlist.length;
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
	optimizer.showAll();
	optimizer.showNext();
}
function onClick_form1_next(){
	optimizer.showNext();
}

function onChange_form1_knamelist(id){
	var idx=id.slice(-1);
	var val=document.getElementById("knamelist"+idx).value;
	if(val=="_erase"){
		document.getElementById("kname"+idx).value="";
		document.getElementById("acnum"+idx+"_1").value="0";
		document.getElementById("acnum"+idx+"_2").value="0";
		document.getElementById("acnum"+idx+"_3").value="0";
		document.getElementById("acnum"+idx+"_4").value="0";
		document.getElementById("kvalid"+idx).checked=false;
	}
	else if(val.slice(6)!="_Dummy"){
		var kandata=KanDatabase[val];
		document.getElementById("kname"+idx).value=kandata.name;
		document.getElementById("acnum"+idx+"_1").value=""+kandata.acnum[0];
		document.getElementById("acnum"+idx+"_2").value=""+kandata.acnum[1];
		document.getElementById("acnum"+idx+"_3").value=""+kandata.acnum[2];
		document.getElementById("acnum"+idx+"_4").value=""+kandata.acnum[3];
		document.getElementById("kvalid"+idx).checked=true;
	}
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
