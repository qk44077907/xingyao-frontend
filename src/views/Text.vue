<template>
  <div class="box">
    <canvas id="canvas" width="302" height="302"></canvas>
    <ul>
      <li>
        <span>0</span>
      </li>
      <li>
        <span>1</span>
      </li>
      <li ref="el1" class="cur">
        <span>2</span>
      </li>
      <li>
        <span>3</span>
      </li>
      <li>
        <span>4</span>
      </li>
      <li>
        <span>5</span>
      </li>
      <li>
        <span>6</span>
      </li>
      <li>
        <span>7</span>
      </li>
      <li>
        <span>8</span>
      </li>
      <li>
        <span>9</span>
      </li>
    </ul>
    <ul>
      <li>
        <span>0</span>
      </li>
      <li>
        <span>1</span>
      </li>
      <li>
        <span>2</span>
      </li>
      <li ref="el2" class="cur">
        <span>3</span>
      </li>
      <li>
        <span>4</span>
      </li>
      <li>
        <span>5</span>
      </li>
      <li>
        <span>6</span>
      </li>
      <li>
        <span>7</span>
      </li>
      <li>
        <span>8</span>
      </li>
      <li>
        <span>9</span>
      </li>
    </ul>
    <ul>
      <li>
        <span>0</span>
      </li>
      <li>
        <span>1</span>
      </li>
      <li>
        <span>2</span>
      </li>
      <li>
        <span>3</span>
      </li>
      <li ref="el3" class="cur">
        <span>4</span>
      </li>
      <li>
        <span>5</span>
      </li>
      <li>
        <span>6</span>
      </li>
      <li>
        <span>7</span>
      </li>
      <li>
        <span>8</span>
      </li>
      <li>
        <span>9</span>
      </li>
    </ul>
    <ul>
      <li>
        <span>0</span>
      </li>
      <li>
        <span>1</span>
      </li>
      <li>
        <span>2</span>
      </li>
      <li>
        <span>3</span>
      </li>
      <li ref="el4" class="cur">
        <span>4</span>
      </li>
      <li>
        <span>5</span>
      </li>
      <li>
        <span>6</span>
      </li>
      <li>
        <span>7</span>
      </li>
      <li>
        <span>8</span>
      </li>
      <li>
        <span>9</span>
      </li>
    </ul>
    <ul>
      <li>
        <span>0</span>
      </li>
      <li>
        <span>1</span>
      </li>
      <li>
        <span>2</span>
      </li>
      <li>
        <span>3</span>
      </li>
      <li>
        <span>4</span>
      </li>
      <li>
        <span>5</span>
      </li>
      <li>
        <span>6</span>
      </li>
      <li>
        <span>7</span>
      </li>
      <li>
        <span>8</span>
      </li>
      <li ref="el5" class="cur">
        <span>9</span>
      </li>
    </ul>
    <ul>
      <li>
        <span>0</span>
      </li>
      <li>
        <span>1</span>
      </li>
      <li>
        <span>2</span>
      </li>
      <li>
        <span>3</span>
      </li>
      <li>
        <span>4</span>
      </li>
      <li>
        <span>5</span>
      </li>
      <li>
        <span>6</span>
      </li>
      <li>
        <span>7</span>
      </li>
      <li ref="el6" class="cur">
        <span>8</span>
      </li>
      <li>
        <span>9</span>
      </li>
    </ul>
    <ul>
      <li>
        <span>0</span>
      </li>
      <li>
        <span>1</span>
      </li>
      <li>
        <span>2</span>
      </li>
      <li>
        <span>3</span>
      </li>
      <li>
        <span>4</span>
      </li>
      <li ref="el7" class="cur">
        <span>5</span>
      </li>
      <li>
        <span>6</span>
      </li>
      <li>
        <span>7</span>
      </li>
      <li>
        <span>8</span>
      </li>
      <li>
        <span>9</span>
      </li>
    </ul>
    <ul>
      <li>
        <span>0</span>
      </li>
      <li>
        <span>1</span>
      </li>
      <li>
        <span>2</span>
      </li>
      <li>
        <span>3</span>
      </li>
      <li>
        <span>4</span>
      </li>
      <li>
        <span>5</span>
      </li>
      <li>
        <span>6</span>
      </li>
      <li>
        <span>7</span>
      </li>
      <li ref="el8" class="cur">
        <span>8</span>
      </li>
      <li>
        <span>9</span>
      </li>
    </ul>
    <ul>
      <li>
        <span>0</span>
      </li>
      <li>
        <span>1</span>
      </li>
      <li>
        <span>2</span>
      </li>
      <li>
        <span>3</span>
      </li>
      <li>
        <span>4</span>
      </li>
      <li>
        <span>5</span>
      </li>
      <li>
        <span>6</span>
      </li>
      <li>
        <span>7</span>
      </li>
      <li ref="el9" class="cur">
        <span>8</span>
      </li>
      <li>
        <span>9</span>
      </li>
    </ul>
    <ul>
      <li>
        <span>0</span>
      </li>
      <li>
        <span>1</span>
      </li>
      <li ref="el10" class="cur">
        <span>2</span>
      </li>
      <li>
        <span>3</span>
      </li>
      <li>
        <span>4</span>
      </li>
      <li>
        <span>5</span>
      </li>
      <li>
        <span>6</span>
      </li>
      <li>
        <span>7</span>
      </li>
      <li>
        <span>8</span>
      </li>
      <li>
        <span>9</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    mounted() {
      let canvas = document.getElementById('canvas');
      let ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.moveTo(this.$refs.el1.offsetLeft+15, this.$refs.el1.offsetTop+15);
      ctx.lineTo(this.$refs.el2.offsetLeft+15,this.$refs.el2.offsetTop+15);
      ctx.lineTo(this.$refs.el3.offsetLeft+15,this.$refs.el3.offsetTop+15);
      ctx.lineTo(this.$refs.el4.offsetLeft+15,this.$refs.el4.offsetTop+15);
      ctx.lineTo(this.$refs.el5.offsetLeft+15,this.$refs.el5.offsetTop+15);
      ctx.lineTo(this.$refs.el6.offsetLeft+15,this.$refs.el6.offsetTop+15);
      ctx.lineTo(this.$refs.el7.offsetLeft+15,this.$refs.el7.offsetTop+15);
      ctx.lineTo(this.$refs.el8.offsetLeft+15,this.$refs.el8.offsetTop+15);
      ctx.lineTo(this.$refs.el9.offsetLeft+15,this.$refs.el9.offsetTop+15);
      ctx.lineTo(this.$refs.el10.offsetLeft+15,this.$refs.el10.offsetTop+15);
      ctx.stroke();
    },
    methods: {

    }
  }
</script>

<style lang="scss">
  .box {
    margin: 50px;
    display: inline-block;
    position: relative;
    height: 302px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
    }
    ul {
      border: 1px solid #ccc;
      font-size: 0;
      box-sizing: border-box;
      width: 302px;
      height: 30px;
      border-top: none;
      li {
        font-size: 16px;
        text-align: center;
        display: inline-block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        border-right: 1px solid #ccc;
        box-sizing: border-box;
        position: relative;
        span {
          display: inline-block;
          width: 20px;
          height: 20px;
          line-height: 20px;
        }
        &.cur {
          span {
            background: #ccc;
            color: #fff;
            border-radius: 20px;
            position: relative;
            z-index: 100;
          }
        }
        &:last-child {
          border-right: none;
        }
      }
    }
  }

</style>
