const Footer = () => {
  //const imgage = './srcassets\img\Logo_BlancoPNG.webp'
  //D:\Novoos\Order\order-nft-club\src\assets\img\Logo_BlancoPNG.webp
  return (
    <footer>
      <div className="footer_inner">
        <div>
          <a href="https://Novoos.co" target="_blank">
            <div className="img-responsive"></div>
          </a>
        </div>
        <div>
          {" "}
          <p>
            &copy; Copyright 2023 -{" "}
            <a href="https://Novoos.co" target="_blank">
              Novoos.co
            </a>
          </p>{" "}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
