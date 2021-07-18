class Point {
  num = 1;

  getNum = () => {
    console.log(this.num);
  };

  addNum = () => {
    this.num = this.num + 1;
  };
}
