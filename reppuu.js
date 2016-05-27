/*
 * ����l�œK���v���O�����g�󕗌��ł���܂��I�h�u���E�U�� v1.0
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
};
var KanDatabase={
	"Akagi" :			new KanData("�ԏ�",	100006,	[18,18,27,10]),
	"Kaga" :			new KanData("����",	100007,	[18,18,45,12]),
	"Souryuu" :		new KanData("����",	100008,	[12,27,18,7]),
	"Hiryuu" :			new KanData("��",	100009,	[12,27,18,7]),
	"Shoukaku" :		new KanData("�Ē�",	100106,	[21,21,21,12]),
	"Zuikaku" :			new KanData("����",	100107,	[21,21,21,12]),
	"Taihou" :			new KanData("��P",	100153,	[18,18,18,7]),
	"Unryuu" :			new KanData("�_��",	100201,	[18,24,3,6]),
	"Amagi" :			new KanData("�V��",	100202,	[18,24,3,6]),
	"Katsuragi" :		new KanData("����",	100203,	[18,24,3,6]),
	"GrafZeppelin" :		new KanData("Graf Zeppelin",	100232,	[20,13,10,0]),

	"Akagi_c" :			new KanData("�ԏ��",	110006,	[20,20,32,10]),
	"Kaga_c" :			new KanData("�����",	110007,	[20,20,46,12]),
	"Souryuu_c" :		new KanData("������",	110008,	[18,27,18,10]),
	"Hiryuu_c" :		new KanData("�򗴉�",	110009,	[18,27,18,10]),
	"Shoukaku_c" :		new KanData("�Ē߉�",	110106,	[24,24,24,12]),
	"Zuikaku_c" :		new KanData("���߉�",	110108,	[24,24,24,12]),
	"Taihou_c" :		new KanData("��P��",	110156,	[30,24,24,8]),
	"Unryuu_c" :		new KanData("�_����",	110206,	[18,21,27,3]),
	"Amagi_c" :		new KanData("�V���",	110229,	[18,21,27,3]),
	"Katsuragi_c" :		new KanData("�����",	110230,	[18,21,27,3]),
	"GrafZeppelin_c" :	new KanData("Graf Zeppelin��",	110232,	[30,13,10,3]),

	"Souryuu_cc" :		new KanData("��������",	120197,	[18,35,20,6]),
	"Hiryy_cc" :		new KanData("�򗴉���",	120196,	[18,36,22,3]),
	"Shoukaku_cc" :		new KanData("�Ē߉���",	120261,	[27,27,27,12]),
	"Shoukaku_cc2" :	new KanData("�Ē߉���b",	121266,	[34,21,12,9]),
	"Zuikaku_cc" :		new KanData("���߉���",	120262,	[28,26,26,13]),
	"Zuikaku_cc2" :		new KanData("���߉���b",	121267,	[34,24,12,6]),

	"Houshou" :		new KanData("�P��",	200025,	[8,11,0,0]),
	"Ryuujou" :		new KanData("���",	200030,	[9,24,5,0]),
	"Hiyou" :			new KanData("���",	200065,	[12,18,18,10]),
	"Jun-you" :		new KanData("����",	200066,	[12,18,18,10]),
	"Shouhou" :		new KanData("�˖P",	200094,	[18,9,3,0]),
	"Zuihou" :			new KanData("���P",	200112,	[18,9,3,0]),
	"Chitose_3" :		new KanData("��΍q",	202104,	[21,9,6,0]),
	"Chiyoda_3" :		new KanData("���c�q",	202105,	[21,9,6,0]),
	"Ryuuhou" :		new KanData("���P",	200185,	[18,7,6,0]),

	"Houshou_c" :		new KanData("�P�ĉ�",	210025,	[14,16,12,0]),
	"Ryuujou_c" :		new KanData("��鈉�",	210030,	[9,24,5,5]),
	"Hiyou_c" :			new KanData("����",	210065,	[18,18,18,12]),
	"Jun-you_c" :		new KanData("�����",	210066,	[18,18,18,12]),
	"Shouhou_c" :		new KanData("�˖P��",	210094,	[18,12,12,6]),
	"Zuihou_c" :		new KanData("���P��",	210113,	[18,12,12,6]),
	"Chitose_3c" :		new KanData("��΍q��",	212104,	[24,16,8,8]),
	"Chiyoda_3c" :		new KanData("���c�q��",	212105,	[24,16,8,8]),
	"Ryuuhou_c" :		new KanData("���P��",	210190,	[21,9,9,6]),

	"Ryuujou_cc" :		new KanData("��鈉���",	220157,	[18,28,6,3]),
	"Jun-you_cc" :		new KanData("�������",	220208,	[24,18,20,4]),
	"Chitose_3cc" :		new KanData("��΍q����",	220121,	[24,16,11,8]),
	"Chiyoda_3cc" :		new KanData("���c�q����",	220122,	[24,16,11,8]),
	
	"Akitsumaru_c" :		new KanData("�����ۉ�",	210166,	[8,8,8,0])
};


var Config=function(){
	this.knum=3; //int		//�L���͂̐�
	this.target=182; //int		//�ڕW����l
	this.marginrate=1.1; //float	//�}�[�W��
	this.maxmargin=2.0; //float	//����}�[�W��
	this.askinds=4; //int		//�@��̎�ސ�
	this.aspow=[]; //Array		//�e�@��̐���l
	this.asnum=[];  //Array	//�e�@��̏�����
	this.bonus=25; //int		//�n���x�{�[�i�X
	this.listnum=20; //int		//���ʃ��X�g��
	this.acnum=[]; //Array		//�e�X���b�g�̋@���i�������Ǝ����I��0�Ɂj
	this.kvalidList=[]; //Array	//�L���͂̃��X�g
	this.kvalidListInv={}; //Map	//�t����
};

var ResRec=function(state,value){
	this.state=state; //Array
	this.anum=0; //int
	this.value=value; //int
	
	this.calcAnum();
};
ResRec.prototype={
	clone: function(){
		return new ResRec(this.state.concat(),this.value);
	},
	compareTo: function(dst){
		if(this.anum==dst.anum && this.value==dst.value) return 0;
		else if(this.anum<dst.anum  || this.anum==dst.anum && this.value<dst.value) return 1;
		else return -1;
	},
	calcAnum: function(){
		this.anum=bitcount(this.state[0]);
	}
};

var AsStat=function(aspow,asnum){
	this.aspow=aspow;
	this.asnum=asnum;
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
		this.config.aspow=[];
		this.config.asnum=[];
		var taslist=[];
		var askinds=1;
		for(;askinds<=9;++askinds){
			var col=document.getElementById("aspow_"+askinds);
			if(col==null) break;
			var taspow=col.value;
			var tasnum=document.getElementById("asnum_"+askinds).value;
			taslist.push(new AsStat(+taspow,+tasnum));
		}
		--askinds;
		this.config.askinds=askinds;
		//�\�[�g����
		taslist.sort(function(a,b){
			if( a.aspow < b.aspow ) return -1;
			if( a.aspow > b.aspow ) return 1;
			return 0;
		});
		for(i=0;i<taslist.length;++i){
			this.config.aspow.push(taslist[i].aspow);
			this.config.asnum.push(taslist[i].asnum);
		}
		//�߂�
		for(i=0;i<askinds;++i){
			document.getElementById("aspow_"+(i+1)).value="+"+this.config.aspow[i];
			document.getElementById("asnum_"+(i+1)).value=""+this.config.asnum[i];
		}
		
		
		this.config.target=+document.getElementById("target").value;
		this.config.marginrate=+document.getElementById("marginrate").value;
		this.config.maxmargin=+document.getElementById("maxmargin").value;
		this.config.listnum=+document.getElementById("listnum").value;
		
		this.config.kvalidList=[];
		this.config.kvalidListInv={};
		this.config.knum=0;
		
		//�����Ȋ̓X���b�g�͔����đO�ɋl�߂�
		for(i=0;i<6;++i){
			if(document.getElementById("kvalid"+(i+1)).checked){
				++this.config.knum;
				this.config.kvalidList.push(i);
				this.config.kvalidListInv[i]=this.config.knum-1; //�t����
			}
		}
		
		this.config.acnum=[];
		
		for(r=0;r<6;++r){
			if(!(r in this.config.kvalidListInv)) continue;
		for(c=0;c<4;++c){
			var tstr="acvalid"+(r+1)+"_"+(c+1);
			var isValid=(document.getElementById(tstr).checked);
			tstr="acnum"+(r+1)+"_"+(c+1);
			this.config.acnum.push(isValid?(+document.getElementById(tstr).value):0);
		}}
	},
	
	//Buggy
	calcAllAcpow: function(){
		for(i=0;i<4*this.config.knum;++i){
			this.config.acpow[i]=calcAcpow(this.config.acnum[i], this.config.aspow, this.config.bonus);
		}
	},

	//v0
	//~ calcAllPattern_r: function(head,state,value){
		//~ if(head<4*this.config.knum){
			//~ //���ĂȂ�
			//~ this.calcAllPattern_r(head+1.,state,value);
			
			//~ //���Ă�
			//~ if(this.config.acpow[head]>0 && value<Math.floor(this.config.maxmargin*this.config.target))
				//~ this.calcAllPattern_r(head+1,state|(1<<head),value+this.config.acpow[head]);
		//~ }
		//~ else{
			//~ this.dp[state]=value;
			//~ var tval=value-Math.floor(this.config.target*this.config.marginrate);
			//~ if(tval>=0){
				//~ var res=new ResRec(state,value);
				//~ this.list.push(res);
				//~ if(this.list.size()>this.config.listnum) this.list.pop();
			//~ }
		//~ }
	//~ },
	
	calcAllPattern_r: function(head, state, anum){
		if(head<4*this.config.knum){
			//0
			this.calcAllPattern_r(head+1,state.clone(),anum.concat());
			//k1~
			if(this.config.acnum[head]>0 && state.value<Math.floor(this.config.target*this.config.maxmargin)){ //�L���X���b�g&&��������ĂȂ�
				for(asidx=this.config.askinds; asidx>=1; --asidx){ //�S�Ă̋@��ɂ��� �~���ɂ��
					if(anum[asidx-1]>0){ //�܂��c���Ă�
						new_state=new ResRec(state.state.concat(),state.value);
						new_state.state[0]|=(1<<head);
						new_state.state[asidx]|=(1<<head);
						new_state.value+=calcAcpow(this.config.acnum[head],this.config.aspow[asidx-1],this.config.bonus);
						new_anum=anum.concat();
						--new_anum[asidx-1];
						this.calcAllPattern_r(head+1,new_state, new_anum);
					}
				}
			}
		}else{
			//���ʋL��
			if(state.value>=Math.floor(this.config.target*this.config.marginrate)){
				this.list.push(state);
				if(this.list.size()>this.config.listnum) this.list.pop();
			}
		}
	},

	execute: function(){
		this.readData();
		var tstate=new Array(this.config.askinds+1);
		for(i=0;i<tstate.length;++i) tstate[i]=0;
		var state=new ResRec(tstate,0);
		this.calcAllPattern_r(0, state, this.config.asnum.concat());
	},
	
	showAll: function(){
		var str="";
		
		var tlist=this.list.clone();
		str+="target: "+Math.floor(this.config.target*this.config.marginrate)+"<BR />\n";
		while(!tlist.empty()){
			var res=tlist.pop();
			str+=("000000"+bitrev(res.state[0],4*this.config.knum).toString(16)).slice(-this.config.knum)+" "+bitcount(res.state[0])+" "+res.value+"<BR />\n";
			this.orderedlist.push(res);
		}
		document.getElementById("status").innerHTML=str;

		this.curListIdx=0;
	},
	
	showNext: function(){
		++this.curListIdx;
		if(this.curListIdx<this.orderedlist.length){
			var acsum=0;
			var res=this.orderedlist[this.orderedlist.length-this.curListIdx-1]; //��납����
			//var res=this.orderedlist.shift(); //�O������
			this.curRes=res.clone();
			this.curRes.state[0]=0;
			for(i=0;i<this.curResAK.length;++i) this.curResAK[i]=0;
			for(r=0;r<6;++r){
			for(c=0;c<4;++c){
				var id="actext"+ (r+1) +"_"+ (c+1);
				var mask=(1<<(c+this.config.kvalidListInv[r]*4));
				if((r in this.config.kvalidListInv)&&(res.state[0]&mask)!=0){
					for(i=0;i<this.config.askinds;++i){
						if((res.state[i+1]&mask)!=0) break;
					}
					this.curRes.state[0]|=(1<<(c+r*4));
					this.curResAK[c+r*4]=this.config.aspow[i];
					document.getElementById(id).innerHTML=(this.config.aspow[i]>0?("+"+this.config.aspow[i]):"");
				}
				else{
					document.getElementById(id).innerHTML="";
				}
			}}
			
			document.getElementById("totalacpow").innerHTML="total: "+res.value+" | anum: "+bitcount(res.state[0])+" | remain: "+(this.orderedlist.length-this.curListIdx-1);
		}
		else{
			if(this.orderedlist.length>1){
				alert("end of the list. Return to start.");
				this.curListIdx=-1;
				this.showNext();
			}
		}
	},
	
	clearShow: function(){
		document.getElementById("totalacpow").innerHTML="";
		document.getElementById("status").innerHTML="";
	}
};


var optimizer=new Optimizer;

function onClick_form1_as_addcolumn(){
	var taspow=[];
	var tasnum=[];
	var askinds=1;
	for(askinds=1;askinds<=9;++askinds){
		var col=document.getElementById("aspow_"+askinds);
		if(col==null) break;
		taspow.push(col.value);
		tasnum.push(document.getElementById("asnum_"+askinds).value);
	}
	if(askinds==10) return;
	--askinds;
	
	var str=
	"<TR>\n"+
	"<TD><BUTTON id=\"as_addcolumn\" onClick=\"onClick_form1_as_addcolumn()\">add</BUTTON></TD>\n"+
	"</TR>\n"+
	"<TR>\n";
	for(i=1;i<=askinds;++i){
		str+=
		"<TD>\n"+
		"<INPUT id=\"aspow_"+i+"\" type=\"text\" size=\"2\"  value=\""+taspow[i-1]+"\" /><BR />\n"+
		"<INPUT id=\"asnum_"+i+"\" type=\"text\" size=\"2\"  value=\""+tasnum[i-1]+"\" /><BR />\n"+
		"<BUTTON id=\"asdel_"+i+"\" onClick=\"onClick_form1_asdel('asdel_"+i+"')\">del</BUTTON>\n"+
		"</TD>\n";
	}
	++askinds;
	str+=
	"<TD>\n"+
	"<INPUT id=\"aspow_"+askinds+"\" type=\"text\" size=\"2\"  value=\"+0\" /><BR />\n"+
	"<INPUT id=\"asnum_"+i+"\" type=\"text\" size=\"2\"  value=\"0\" /><BR />\n"+
	"<BUTTON id=\"asdel_"+i+"\" onClick=\"onClick_form1_asdel('asdel_"+i+"')\">del</BUTTON>\n"+
	"</TD>\n";
	str+="</TR>\n";
	document.getElementById("astab").innerHTML=str;
}
function onClick_form1_asdel(id){
	var asidx=+id.slice(-1)-1;
	
	var taspow=[];
	var tasnum=[];
	for(askinds=1;askinds<=9;++askinds){
		var col=document.getElementById("aspow_"+askinds);
		if(col==undefined) break;
		taspow.push(col.value);
		tasnum.push(document.getElementById("asnum_"+askinds).value);
	}
	--askinds;
	if(askinds<=1 || asidx>=askinds) return;
	
	taspow.splice(asidx,1);
	tasnum.splice(asidx,1);
	--askinds;
	
	var str=
	"<TR>\n"+
	"<TD><BUTTON id=\"as_addcolumn\" onClick=\"onClick_form1_as_addcolumn()\">add</BUTTON></TD>\n"+
	"</TR>\n"+
	"<TR>\n";
	for(i=1;i<=askinds;++i){
		str+=
		"<TD>\n"+
		"<INPUT id=\"aspow_"+i+"\" type=\"text\" size=\"2\"  value=\""+taspow[i-1]+"\" /><BR />\n"+
		"<INPUT id=\"asnum_"+i+"\" type=\"text\" size=\"2\"  value=\""+tasnum[i-1]+"\" /><BR />\n"+
		"<BUTTON id=\"asdel_"+i+"\" onClick=\"onClick_form1_asdel('asdel_"+i+"')\">del</BUTTON>\n"+
		"</TD>\n";
	}
	str+="</TR>\n";
	document.getElementById("astab").innerHTML=str;
}

function onClick_form1_execute(){
	optimizer.init();
	optimizer.execute();
	optimizer.showAll();
	optimizer.curListIdx=-1;
	optimizer.showNext();
}
function onClick_form1_next(){
	if(optimizer.orderedlist.length>0) optimizer.showNext();
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
	optimizer.curRes.state[0]|=(1<<(aidx+kidx*4));
	++optimizer.curResAK[aidx+kidx*4];
	document.getElementById("actext"+(kidx+1)+"_"+(aidx+1)).innerHTML="+"+optimizer.curResAK[aidx+kidx*4];
	document.getElementById("totalacpow").innerHTML="total: "+calcAllAcpowSum()+" | anum: "+bitcount(optimizer.curRes.state[0])+" | remain: "+(optimizer.orderedlist.length-optimizer.curListIdx-1);
}
function onClick_form1_acincinc(id){
	var kidx=+id.substr(-3,1)-1;
	var aidx=+id.slice(-1)-1;
	optimizer.curRes.state[0]|=(1<<(aidx+kidx*4));
	optimizer.curResAK[aidx+kidx*4]+=10;
	document.getElementById("actext"+(kidx+1)+"_"+(aidx+1)).innerHTML="+"+optimizer.curResAK[aidx+kidx*4];
	document.getElementById("totalacpow").innerHTML="total: "+calcAllAcpowSum()+" | anum: "+bitcount(optimizer.curRes.state[0])+" | remain: "+(optimizer.orderedlist.length-optimizer.curListIdx-1);
}
function onClick_form1_acdec(id){
	var kidx=+id.substr(-3,1)-1;
	var aidx=+id.slice(-1)-1;
	if(optimizer.curResAK[aidx+kidx*4]>0){
		--optimizer.curResAK[aidx+kidx*4];
		if(optimizer.curResAK[aidx+kidx*4]==0) optimizer.curRes.state[0]&=~(1<<(aidx+kidx*4));
		if(optimizer.curResAK[aidx+kidx*4]<0) optimizer.curResAK[aidx+kidx*4]=0;
		document.getElementById("actext"+(kidx+1)+"_"+(aidx+1)).innerHTML=(optimizer.curResAK[aidx+kidx*4]>0?("+"+optimizer.curResAK[aidx+kidx*4]):"");
		document.getElementById("totalacpow").innerHTML="total: "+calcAllAcpowSum()+" | anum: "+bitcount(optimizer.curRes.state[0])+" | remain: "+(optimizer.orderedlist.length-optimizer.curListIdx-1);
	}
}
function onClick_form1_acdecdec(id){
	var kidx=+id.substr(-3,1)-1;
	var aidx=+id.slice(-1)-1;
	if(optimizer.curResAK[aidx+kidx*4]>0){
		optimizer.curResAK[aidx+kidx*4]-=10;
		if(optimizer.curResAK[aidx+kidx*4]<0) optimizer.curResAK[aidx+kidx*4]=0;
		if(optimizer.curResAK[aidx+kidx*4]==0) optimizer.curRes.state[0]&=~(1<<(aidx+kidx*4));
		document.getElementById("actext"+(kidx+1)+"_"+(aidx+1)).innerHTML=(optimizer.curResAK[aidx+kidx*4]>0?("+"+optimizer.curResAK[aidx+kidx*4]):"");
		document.getElementById("totalacpow").innerHTML="total: "+calcAllAcpowSum()+" | anum: "+bitcount(optimizer.curRes.state[0])+" | remain: "+(optimizer.orderedlist.length-optimizer.curListIdx-1);
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
