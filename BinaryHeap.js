/**
 * BinaryHeap
 */
var BinaryHeap = function(){
    var self = this;
    self._ary  = [];
}
BinaryHeap.prototype._build = function(){
    var self = this;
    /**
     * heapify
     * 3�v�f���r���ł��������v�f��e�Ƃ���
     * @param {array} ary
     * @param {int} i
     * @param {max} max
     */
    var heapify = function(ary, i, max){
        /**
         * swap
         * @param {array} ary
         * @param {int} x
         * @param {int} y
         */
        var swap = function(ary, x, y){
            var a = ary[x];
            var b = ary[y];
            ary[x] = b;
            ary[y] = a;
            return true;
        }
        
        var l = 2 * i + 1;
        var r = 2 * i + 2;
        var li = 0;
        if(l < max && ary[l].compareTo(ary[i])<0){
            li = l;
        }
        else{
            li = i;
        }
        if(r < max && ary[r].compareTo(ary[li])<0){
            li = r;
        }
        if(li !== i){
            swap(ary, i, li);
            heapify(ary, li, max);
        }
    }
    var ary = self._ary;
    for(var i = ary.length - 1; i >= 0; i--){
        heapify(ary, i, self._ary.length);
    }
}
/**
 * BinaryHeap::push
 * �v�f���q�[�v�ɒǉ�����
 * @param {Object} elm
 * @param {int} priority
 */
BinaryHeap.prototype.push = function(elm){
    var self = this;
    self._ary.push(elm);
    self._build();
}
/**
 * BinaryHeap::changePriority
 * �v�f�̗D��x��ύX����
 * @param {Object} elm
 * @param {int} priority
 */
//~ BinaryHeap.prototype.changePriority = function(elm, priority){
    //~ var self = this;
    //~ var ary  = self._ary;
    //~ for(var i = 0; i < ary.length; i++){
        //~ if(elm === ary[i]["elm"]){
            //~ ary[i]["priority"] = priority;
            //~ self._build();
            //~ return true;
        //~ }
    //~ }
    //~ return false;
//~ }
/**
 * BinaryHeap::front
 * �D��x�̍����v�f���擾����
 */
BinaryHeap.prototype.front = function(){
    var self = this;
    return self._ary[0];
}
/**
 * BinaryHeap::pop
 * �擪�v�f���̂Ă�
 */
BinaryHeap.prototype.pop = function(){
    var self = this;
    var elm  = self._ary.shift();
    self._build();
    return elm;
}
/**
 * BinaryHeap::getList
 * �q�[�v��Ԃ�
 */
BinaryHeap.prototype.getList = function(){
    var self = this;
    return self._ary;
}
/**
 * BinaryHeap::size
 * �T�C�Y��Ԃ�
 */
BinaryHeap.prototype.size = function(){
    var self = this;
    return self._ary.length;
}
/**
 * BinaryHeap::empty
 * �󂩂ǂ����H
 */
BinaryHeap.prototype.empty = function(){
    var self = this;
    return (self._ary.length==0?true:false);
}
/**
 * BinaryHeap::clone
 * �f�B�[�v�R�s�[�p
 */
BinaryHeap.prototype.clone = function(){
	var res=new BinaryHeap;
	res._ary=this._ary.concat();
	return res;
}


// test code
//~ var pq = new BinaryHeap();
//~ pq.insert('pochi', 0);
//~ pq.insert('son', 4);
//~ pq.insert('mike', 10);
//~ pq.insert('father', 1);
//~ pq.insert('mother', 2);
//~ console.log(pq.getList());
