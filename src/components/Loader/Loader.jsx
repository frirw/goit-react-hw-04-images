import { Hearts } from 'react-loader-spinner';

const Loader = () => {
  return(
    <Hearts
      height="80"
      width="80"
      color="#ffc0cb"
      ariaLabel="hearts-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default Loader;
