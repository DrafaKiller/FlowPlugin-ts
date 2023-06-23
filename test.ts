interface Test {
  name: string;
  age: number;
}

type A = {
  name: 'A';
  age: 1;
  cool: true;
};

type B = {
  name: 'A';
  cool: true;
};

type Result = Pick<Test & A, keyof Test>;

const result: Result = {
  name: 'A',
  age: 1,
};
