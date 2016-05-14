/*
 * §‹ó’lÅ“K‰»ƒvƒƒOƒ‰ƒ€g—ó•—Œ‚Å‚ ‚è‚Ü‚·Ihƒuƒ‰ƒEƒU”Å v0.4
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
function calcAcpow(acnum,apow,bonus){
	return (acnum>0&&apow>0?Math.floor(apow*Math.sqrt(acnum))+bonus:0);
}
function calcAllAcpowSum(){
	var sum=0;
	for(r=0;r<6;++r){
		if(!document.getElementById("kvalid"+(r+1)).checked) continue;
	for(c=0;c<4;++c){
		sum+=document.getElementById("acvalid"+(r+1)+"_"+(c+1)).checked?calcAcpow(+document.getElementById("acnum"+(r+1)+"_"+(c+1)).value,optimizer.curResAK[c+r*4],optimizer.config.bonus):0;
	}}
	return sum;
}

var KanData=function(name,id,acnum){
	this.name=name;
	this.id=id;
	this.acnum=acnum;
}
var KanDatabase={
	"Akagi" :			new KanData("Ôé",	100006,	[18,18,27,10]),
	"Kaga" :			new KanData("‰Á‰ê",	100007,	[18,18,45,12]),
	"Souryuu" :		new KanData("‘“—´",	100008,	[12,27,18,7]),
	"Hiryuu" :			new KanData("”ò—´",	100009,	[12,27,18,7]),
	"Shoukaku" :		new KanData("ãÄ’ß",	100106,	[21,21,21,12]),
	"Zuikaku" :			new KanData("’ß",	100107,	[21,21,21,12]),
	"Taihou" :			new KanData("‘å–P",	100153,	[18,18,18,7]),
	"Unryuu" :			new KanData("‰_—´",	100201,	[18,24,3,6]),
	"Amagi" :			new KanData("“Vé",	100202,	[18,24,3,6]),
	"Katsuragi" :		new KanData("Š‹é",	100203,	[18,24,3,6]),
	"GrafZeppelin" :		new KanData("Graf Zeppelin",	100232,	[20,13,10,0]),

	"Akagi_c" :			new KanData("Ôé‰ü",	110006,	[20,20,32,10]),
	"Kaga_c" :			new KanData("‰Á‰ê‰ü",	110007,	[20,20,46,12]),
	"Souryuu_c" :		new KanData("‘“—´‰ü",	110008,	[18,27,18,10]),
	"Hiryuu_c" :		new KanData("”ò—´‰ü",	110009,	[18,27,18,10]),
	"Shoukaku_c" :		new KanData("ãÄ’ß‰ü",	110106,	[24,24,24,12]),
	"Zuikaku_c" :		new KanData("’ß‰ü",	110108,	[24,24,24,12]),
	"Taihou_c" :		new KanData("‘å–P‰ü",	110156,	[30,24,24,8]),
	"Unryuu_c" :		new KanData("‰_—´‰ü",	110206,	[18,21,27,3]),
	"Amagi_c" :		new KanData("“Vé‰ü",	110229,	[18,21,27,3]),
	"Katsuragi_c" :		new KanData("Š‹é‰ü",	110230,	[18,21,27,3]),
	"GrafZeppelin_c" :	new KanData("Graf Zeppelin‰ü",	110232,	[30,13,10,3]),

	"Souryuu_cc" :		new KanData("‘“—´‰ü“ñ",	120197,	[18,35,20,6]),
	"Hiryy_cc" :		new KanData("”ò—´‰ü“ñ",	120196,	[18,36,22,3]),
	"Shoukaku_cc" :		new KanData("ãÄ’ß‰ü“ñ",	120261,	[27,27,27,12]),
	"Shoukaku_cc2" :	new KanData("ãÄ’ß‰ü“ñb",	121266,	[34,21,12,9]),
	"Zuikaku_cc" :		new KanData("’ß‰ü“ñ",	120262,	[28,26,26,13]),
	"Zuikaku_cc2" :		new KanData("’ß‰ü“ñb",	121267,	[34,24,12,6]),

	"Houshou" :		new KanData("–PãÄ",	200025,	[8,11,0,0]),
	"Ryuujou" :		new KanData("—´éˆ",	200030,	[9,24,5,0]),
	"Hiyou" :			new KanData("”ò‘é",	200065,	[12,18,18,10]),
	"Jun-you" :		new KanData("”¹‘é",	200066,	[12,18,18,10]),
	"Shouhou" :		new KanData("Ë–P",	200094,	[18,9,3,0]),
	"Zuihou" :			new KanData("–P",	200112,	[18,9,3,0]),
	"Chitose_3" :		new KanData("çÎq",	202104,	[21,9,6,0]),
	"Chiyoda_3" :		new KanData("ç‘ã“cq",	202105,	[21,9,6,0]),
	"Ryuuhou" :		new KanData("—´–P",	200185,	[18,7,6,0]),

	"Houshou_c" :		new KanData("–PãÄ‰ü",	210025,	[14,16,12,0]),
	"Ryuujou_c" :		new KanData("—´éˆ‰ü",	210030,	[9,24,5,5]),
	"Hiyou_c" :			new KanData("”ò‘é‰ü",	210065,	[18,18,18,12]),
	"Jun-you_c" :		new KanData("”¹‘é‰ü",	210066,	[18,18,18,12]),
	"Shouhou_c" :		new KanData("Ë–P‰ü",	210094,	[18,12,12,6]),
	"Zuihou_c" :		new KanData("–P‰ü",	210113,	[18,12,12,6]),
	"Chitose_3c" :		new KanData("çÎq‰ü",	212104,	[24,16,8,8]),
	"Chiyoda_3c" :		new KanData("ç‘ã“cq‰ü",	212105,	[24,16,8,8]),
	"Ryuuhou_c" :		new KanData("—´–P‰ü",	210190,	[21,9,9,6]),

	"Ryuujou_cc" :		new KanData("—´éˆ‰ü“ñ",	220157,	[18,28,6,3]),
	"Jun-you_cc" :		new KanData("”¹‘é‰ü“ñ",	220208,	[24,18,20,4]),
	"Chitose_3cc" :		new KanData("çÎq‰ü“ñ",	220121,	[24,16,11,8]),
	"Chiyoda_3cc" :		new KanData("ç‘ã“cq‰ü“ñ",	220122,	[24,16,11,8]),
	
	"Akitsumaru_c" :		new KanData("‚ ‚«‚ÂŠÛ‰ü",	210166,	[8,8,8,0])
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
	clone: function(){
		return new ResRec(this.state,this.anum,this.value);
	},
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
	this.curRes=new ResRec(0,0,0);
	this.curResAK=new Array(4*6);
	for(i=0;i<4*6;++i) this.curResAK[i]=0;
	this.curListIdx=-1;
};
Optimizer.prototype={
	init: function(){
		this.config=new Config;
		for(i=0;i<this.dp.length;++i) this.dp[i]=0;
		this.list=new BinaryHeap;
		this.orderedlist=[];
		this.curRes=new ResRec(0,0);
		for(i=0;i<4*6;++i) this.curResAK[i]=0;
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
		
		this.calcAllAcpow();
	},
	
	calcAllAcpow: function(){
		for(i=0;i<4*this.config.knum;++i){
			this.config.acpow[i]=calcAcpow(this.config.acnum[i],this.config.apow,this.config.bonus);
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
			if(tval>=0){
				var res=new ResRec(state,value);
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
			str+=("000000"+bitrev(res.state,4*this.config.knum).toString(16)).slice(-this.config.knum)+" "+bitcount(res.state)+" "+res.value+"<BR />\n";
			this.orderedlist.push(res);
		}
		document.getElementById("status").innerHTML=str;

		this.curListIdx=0;
	},
	
	showNext: function(){
		if(this.curListIdx<this.orderedlist.length){
			var acsum=0;
			var res=this.orderedlist[this.orderedlist.length-this.curListIdx-1]; //Œã‚ë‚©‚çŽæ‚é
			//var res=this.orderedlist.shift(); //‘O‚©‚çŽæ‚é
			this.curRes=res.clone();
			//this.curRes.state=0;
			this.curResAK=new Array(c+r*4);
			for(i=0;i<this.curResAK.length;++i) this.curResAK[i]=0;
			for(r=0;r<6;++r){
			for(c=0;c<4;++c){
				var id="actext"+ (r+1) +"_"+ (c+1);
				if((r in this.config.kvalidListInv)&&(res.state&(1<<(c+this.config.kvalidListInv[r]*4)))!=0){
					//this.curRes.state|=(1<<(c+r*4));
					this.curResAK[c+r*4]=10;
					document.getElementById(id).innerHTML="+10";
				}
				else{
					document.getElementById(id).innerHTML="";
				}
			}}
			
			document.getElementById("totalacpow").innerHTML="total: "+res.value+" | anum: "+bitcount(res.state)+" | remain: "+(this.orderedlist.length-this.curListIdx-1);
			
			++this.curListIdx;
		}
		else{
			alert("end of the list. Return to start.");
			this.curListIdx=0;
			this.showNext();
		}
	},
	
	clearShow: function(){
		document.getElementById("totalacpow").innerHTML="";
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
	else if(val.substr(0,6)!="_Dummy"){
		var kandata=KanDatabase[val];
		document.getElementById("kname"+idx).value=kandata.name;
		document.getElementById("acnum"+idx+"_1").value=""+kandata.acnum[0];
		document.getElementById("acnum"+idx+"_2").value=""+kandata.acnum[1];
		document.getElementById("acnum"+idx+"_3").value=""+kandata.acnum[2];
		document.getElementById("acnum"+idx+"_4").value=""+kandata.acnum[3];
		document.getElementById("kvalid"+idx).checked=true;
	}
}

function onClick_form1_acinc(id){
	var kidx=+id.substr(-3,1)-1;
	var aidx=+id.slice(-1)-1;
	optimizer.curRes.state|=(1<<(aidx+kidx*4));
	++optimizer.curResAK[aidx+kidx*4];
	document.getElementById("actext"+(kidx+1)+"_"+(aidx+1)).innerHTML="+"+optimizer.curResAK[aidx+kidx*4];
	document.getElementById("totalacpow").innerHTML="total: "+calcAllAcpowSum()+" | anum: "+bitcount(optimizer.curRes.state)+" | remain: "+(optimizer.orderedlist.length-optimizer.curListIdx-1);
}
function onClick_form1_acincinc(id){
	var kidx=+id.substr(-3,1)-1;
	var aidx=+id.slice(-1)-1;
	optimizer.curRes.state|=(1<<(aidx+kidx*4));
	optimizer.curResAK[aidx+kidx*4]+=10;
	document.getElementById("actext"+(kidx+1)+"_"+(aidx+1)).innerHTML="+"+optimizer.curResAK[aidx+kidx*4];
	document.getElementById("totalacpow").innerHTML="total: "+calcAllAcpowSum()+" | anum: "+bitcount(optimizer.curRes.state)+" | remain: "+(optimizer.orderedlist.length-optimizer.curListIdx-1);
}
function onClick_form1_acdec(id){
	var kidx=+id.substr(-3,1)-1;
	var aidx=+id.slice(-1)-1;
	if(optimizer.curResAK[aidx+kidx*4]>0){
		--optimizer.curResAK[aidx+kidx*4];
		if(optimizer.curResAK[aidx+kidx*4]==0) optimizer.curRes.state&=~(1<<(aidx+kidx*4));
		if(optimizer.curResAK[aidx+kidx*4]<0) optimizer.curResAK[aidx+kidx*4]=0;
		document.getElementById("actext"+(kidx+1)+"_"+(aidx+1)).innerHTML=(optimizer.curResAK[aidx+kidx*4]>0?("+"+optimizer.curResAK[aidx+kidx*4]):"");
		document.getElementById("totalacpow").innerHTML="total: "+calcAllAcpowSum()+" | anum: "+bitcount(optimizer.curRes.state)+" | remain: "+(optimizer.orderedlist.length-optimizer.curListIdx-1);
	}
}
function onClick_form1_acdecdec(id){
	var kidx=+id.substr(-3,1)-1;
	var aidx=+id.slice(-1)-1;
	if(optimizer.curResAK[aidx+kidx*4]>0){
		optimizer.curResAK[aidx+kidx*4]-=10;
		if(optimizer.curResAK[aidx+kidx*4]<0) optimizer.curResAK[aidx+kidx*4]=0;
		if(optimizer.curResAK[aidx+kidx*4]==0) optimizer.curRes.state&=~(1<<(aidx+kidx*4));
		document.getElementById("actext"+(kidx+1)+"_"+(aidx+1)).innerHTML=(optimizer.curResAK[aidx+kidx*4]>0?("+"+optimizer.curResAK[aidx+kidx*4]):"");
		document.getElementById("totalacpow").innerHTML="total: "+calcAllAcpowSum()+" | anum: "+bitcount(optimizer.curRes.state)+" | remain: "+(optimizer.orderedlist.length-optimizer.curListIdx-1);
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
