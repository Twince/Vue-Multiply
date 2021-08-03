<template>
  <div class="container">
    <div v-show="modalCheck" class="modalBG" v-on:click="modalCheck = false" />
    <div v-show="modalCheck" class="modalGlass">
        <p class="modalText">수정할 값을 입력해주세요.</p>
        <input v-model="modifyRawInput" type="number" class="modifyInput">
        <button class="modifyCommit" @click="modifyCommit(), resetInput()">수정</button>
    </div>

      <div class="leftBar">
          <div class="leftFlexBox">
               <input v-model.number="rawInput" class="numberInput" type="number" placeholder="여기에 값을 입력해보세요!"/>
                <button class="Run" @click="addArry(rawInput), resetInput()">Go</button>
          </div>
      </div>
      <div class="content">
          
        <div v-for="(item, index) in arryList" v-bind:key="item" class="listBox">
            <p class="gugudanText" v-for="indexLoop in 9" :key="indexLoop">
                {{item}} x {{indexLoop}} = {{item*indexLoop}}
            </p>
            <div class="eventBtnWrap animate__animated animate__fadeInRight">
                <button class="modifyBtn" @click="modifyBtn(index)">수정</button>
                <button class="removeBtn" @click="removeBtn(index)">삭제</button>
            </div>
        </div>
      </div>
  </div>
</template>


<script>
export default {
  data() {
      return{
        arryList: [],
        rawInput: "",
        modifyRawInput: "",
        
        modifyInput: "",
        modifyIndex: "",

        modalCheck: false,
      }
  },
  methods: {
      addArry(rawInput){
            rawInput === "" ? 
                this.$toast("입력창이 비어있거나 숫자인지 확인해주세요.") : this.arryList.includes(rawInput) ? 
                    this.$toast.error("중복된 값은 입력할 수 없습니다.") : this.arryList.push(rawInput);
            // 입력된 데이터가 숫자 형태인지 검사.
            
            console.log(this.arryList);
      },
        removeBtn(index) {
            this.arryList.splice(index, 1);
            //index에 해당하는 값 삭제
        },
        modifyBtn(index) {
            this.modifyIndex = index;
            this.modalCheck = true;
            // 수정버튼 클릭시 인덱스와 모달여부 허용
        },
        modifyCommit() {
            this.modifyInput = this.modifyRawInput;
            //모달에서 수정 클릭 시 인풋에서 값을 변수로 넣어줌
            this.modifyInput === "" ? 
            this.$toast.error("수정할 값을 입력해주세요.") : this.arryList.includes(parseInt(this.modifyInput)) ? 
            this.$toast.error("중복된 값으로 수정할 수 없습니다.") : this.$set(this.arryList, this.modifyIndex, this.modifyInput)
            // 수정시 값이 null값이 아닌지 검사
            this.modalCheck = false;
        },
        resetInput() {
            this.rawInput = "";
            this.modifyRawInput = "";
            // 값 입력 후 폼 초기화
        }
  }
}
</script>

<style>
    *{ transition: all 0.3s; }
    input:focus{ outline: none; }
    .container{
        display: block;

        width: 100vw;
        height: 100vh;

        position: relative;
        z-index: 0;

        display: flex;
    }
    .leftBar{
        position: relative;
        display: flex;

        width: 30%;
        height: 100vh;
        /* background-color: rgb(243, 243, 243); */
        background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
        background-size: 400% 400%;
        animation: gradient 5s ease infinite;
    }

    .numberInput{
        display: block;
        
        margin: 0 auto; 
        align-self: center;

        width: 60%;
        height: 50px;
        
        border: none;
        border-radius: 30px;

        padding: 0 30px;
        text-align: center;
        font-size: 18px;

        background: #fff;
        

        box-shadow: 31px 30px 103px -15px rgba(0,0,0,0.77);
        -webkit-box-shadow: 31px 30px  90px -15px rgba(0,0,0,0.77);
        -moz-box-shadow: 31px 30px 90px -15px rgba(0,0,0,0.77);


    }
    .numberInput:hover{
        
        width: 65%;
        transform: scale(1.03);
    }
    .leftFlexBox{
        width: 100%;
        align-self: center;
    }

    .Run{
        display: block;

        width: 70px;
        height: 45px;

        margin-left: 95px;
        margin-top: 15px;

        border-radius: 500px;
        border: 1px solid white;
        color: white;
        font-weight: 700;

        box-shadow: 31px 30px 103px -15px rgba(0,0,0,0.77);
        -webkit-box-shadow: 31px 30px  90px -15px rgba(0,0,0,0.77);
        -moz-box-shadow: 31px 30px 90px -15px rgba(0,0,0,0.77);
    }
    .Run:hover{
        transform: translateX(5px);
        background-color: rgb(72, 99, 255);
        border: none;
    }

    /* ============== content ================ */
    .content{
        display: flex;
        flex-wrap: wrap;
        
        width: 70%;
        height: auto;

        position: relative;

        background:white;

        overflow-y: scroll;
        padding-bottom: 10px;
    }
    .content::-webkit-scrollbar{
        display:none;
    }

    .listBox{
        display: block;

        width: 260px;
        height: 320px;

        margin: 20px 20px 70px 45px;

        border-radius: 20px;
        background-color: #eee;

        cursor: pointer;

        animation: bounce-in;
        animation-duration: 2s;

        /* box-shadow: 34px 16px 90px -10px #00000030;
    -webkit-box-shadow: 34px 26px 90px -10px #00000036;
    -moz-box-shadow: 34px 26px 90px -10px #0000007d; */
    }
    .listBox:hover{
        transform: scale(1.03);
    }

    .modifyBtn{
        display: block;

        width: 60px;
        height: 50px;

        border-radius: 30px 0 0 30px;    
        background-color: #eee;
    }
    .modifyBtn:hover{
        border: 1px solid rgb(118, 132, 255);
        border-radius: 30px 10px 10px 30px; 

        transform: scale(1.05);
    }
    .modifyBtn:active{
        background-color: rgb(118, 132, 255);
        color: white;
        font-weight: 700;
    }
    .modifyBtn:active .modalBG{
        margin-top: 200px;
    }

    .removeBtn{
        display: block;

        width: 60px;
        height: 50px;
        
        border-radius: 0 30px 30px 0;
        background-color: #eee;
    }
    .removeBtn:hover{
        border-radius: 10px 30px 30px 10px;
        border: 1px solid salmon;

        transform: scale(1.05);
        background-color: salmon;
        color: white;
        
        font-weight: 700;
        transition: 0.7s;
    }
    .removeBtn:active{
        background: salmon;
        color: white;
        font-weight: 700;
    }

    .eventBtnWrap{
        display: flex;
        margin-top: 25px;

        font-size: 13px;
    }

    .gugudanText{
        text-align: center;
        font-weight: 200;
        margin: 14px;

        font-family: 'Inter', sans-serif;
    }

/* -------------- Modal --------------- */

    .modalBG{
        width: 100vw;
        height: 100vh;

        position: fixed;
        z-index: 10;

        background-color: rgba(0, 0, 0, 0.322);
    }

    .modalGlass{
        /* pointer-events: none; */

        width: 300px;
        height: 200px;

        position: absolute;
        z-index: 30;

        background: white;
        background: linear-gradient(
            to right bottom,
            rgba(255, 255, 255, 0.7),
            rgba(255, 255, 255, 0.3)
        );
        border-radius: 20px;
        backdrop-filter: blur(10rem);
        
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;

         box-shadow: 31px 30px 103px -15px rgba(0,0,0,0.1);
        -webkit-box-shadow: 31px 30px  90px -15px rgba(0,0,0,0.1);
        -moz-box-shadow: 31px 30px 90px -15px rgba(0,0,0,0.1);
    }
    .modalGlass:hover{
        margin-top: -5px;
    }

    .modalText{
        display: block;
        text-align: center;

        padding-top: 25px;

        font-size: 18px;
        font-weight: 400;
        color: rgb(105, 105, 105)
    }
    .modifyInput{
        width: 210px;
        height: 50px;
        display: block;

        margin: 0 auto;
        margin-top: 18px;
        text-align: center;

        background-color: rgb(236, 236, 236);
        border-radius: 30px;
    }
    .modifyInput:hover{
        /* transform: scale(1.03); */
    }

    .modifyCommit {
        width: 100%;

        margin-top: 20px;
        padding-top: 20px;

        display: block;
        text-align: center;
        color: rgb(118, 139, 255);

        border-top: 1px solid rgba(128, 128, 128, 0.226);
    }

/* ------------- Animation ------------ */

    @keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

</style>
