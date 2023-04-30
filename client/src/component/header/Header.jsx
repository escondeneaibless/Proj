import React, { useState, useEffect } from "react";
import style from "./Header.module.css";
import {
  Route,
  Link,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Login from "./headerComponents/Login";
import Registration from "./headerComponents/Registration";
import Client from "./headerComponents/Client";
import Forms from "./headerComponents/AdminComponents/Forms";
const Header = () => {
  const [list, setList] = useState([]);
  const [name, setName] = useState('');
  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch('http://localhost:5000/client'); 
        const data = await response.json();
        setList(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchList();
  }, []);


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        {/* onChange={NameChange} */}
        <Route path="/login" element={<Login/>} /> 
        <Route path="/regist" element={<Registration />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/client" element={<Client props={list}/>} />
      </Route>
    )
  );
  
  return (
    <>
      <div className={style.header}>
        <svg width="65" height="65" viewBox="0 0 412 308" fill="none">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M170 147.697H150.713L264.772 23.2231L382.894 147.697H364H170ZM400.899 163.697H386V302.697C386 304.906 384.209 306.697 382 306.697L376 306.697L364 306.697H170L158 306.697L152 306.697C149.791 306.697 148 304.906 148 302.697V261.697H39H28C27.8619 261.697 27.7255 261.69 27.591 261.676C25.5741 261.472 24.0002 259.768 24 257.697V257.697V247.697V169.697H16H5C3.34315 169.697 1.92157 168.69 1.31434 167.254C1.11193 166.776 1 166.249 1 165.697V151.697V57.6971V46.6971C1 44.626 2.574 42.9226 4.59102 42.7178C4.72549 42.7041 4.86193 42.6971 5 42.6971H16H223.151L255.963 6.88899C256.379 5.92426 256.993 5.02606 257.803 4.25714L258.913 3.20393C260.489 1.70783 262.516 0.979779 264.53 1.00769C266.575 0.918275 268.655 1.60927 270.284 3.10183L271.412 4.13551C272.239 4.89302 272.87 5.7842 273.303 6.74566L408.451 149.163C411.493 152.367 411.36 157.431 408.155 160.472L407.045 161.526C405.33 163.153 403.084 163.871 400.899 163.697ZM123.316 151.648L123.271 151.697H39H28H16V57.6971H209.406L123.316 151.648ZM39 247.697V169.697L148 169.697V247.697H39ZM170 292.697V261.697V247.697V163.697H364V281.71C362.813 274.506 357.96 271.676 352.5 271.33V270.697C343.457 270.697 337.726 268.228 334.271 264.885C330.824 261.55 329 256.723 329 250.697C329 247.919 329.279 245.7 329.837 243.782L332.353 238.661C332.546 238.39 332.746 238.12 332.955 237.849C335.205 234.94 338.28 232.145 342.71 228.118L342.71 228.118L342.71 228.118C343.585 227.323 344.513 226.479 345.497 225.578C353.154 219.435 358 210.342 358 200.197C358 181.696 341.882 166.697 322 166.697C302.297 166.697 286.291 181.426 286.004 199.697H286V200.197V292.697L170 292.697ZM347.835 280.501C339.195 279.753 332.279 276.872 327.317 272.072C321.485 266.428 319 258.755 319 250.697C319 243.621 320.494 238.433 323.658 233.662C323.109 233.685 322.556 233.697 322 233.697C311.779 233.697 302.553 229.733 296 223.368V292.697L354.163 292.697C354.064 289.646 351.03 284.623 347.835 280.501ZM360.689 292.697C362.249 291.529 363.482 289.841 364 287.416V292.697H360.689ZM261.295 42.6295C262.562 43.6968 262.724 45.5893 261.657 46.8567L228.806 85.8671C227.739 87.1345 225.846 87.2967 224.579 86.2294C223.312 85.1622 223.149 83.2697 224.217 82.0023L257.068 42.9918C258.135 41.7245 260.027 41.5623 261.295 42.6295ZM231.961 282.077C233.618 282.088 234.969 280.754 234.98 279.097C234.991 277.44 233.657 276.088 232 276.077L180 275.736V250.697C180 249.04 178.657 247.697 177 247.697C175.343 247.697 174 249.04 174 250.697V278.371C173.988 278.478 173.981 278.587 173.98 278.697C173.969 280.354 175.304 281.706 176.961 281.717L231.961 282.077ZM91.0803 240.737C92.737 240.714 94.0621 239.354 94.04 237.697C94.0179 236.04 92.657 234.715 91.0003 234.737L51.9997 235.257C50.343 235.279 49.0179 236.64 49.04 238.297C49.0621 239.953 50.423 241.279 52.0797 241.257L91.0803 240.737ZM31.6206 73.3329L85.962 73.6779C87.6188 73.6885 88.9704 72.3539 88.9809 70.697C88.9915 69.0402 87.6569 67.6886 86.0001 67.6781L28.9999 67.3161C27.9034 67.3091 26.9405 67.8913 26.4117 68.7662C25.9575 69.282 25.6772 69.9557 25.6646 70.6967L25.0511 106.698C25.0229 108.354 26.343 109.72 27.9996 109.748C29.6562 109.776 31.022 108.456 31.0502 106.8L31.6206 73.3329ZM364.009 136.697C364.014 138.354 362.675 139.701 361.019 139.706L173.019 140.288C171.362 140.293 170.014 138.954 170.009 137.297C170.004 135.64 171.343 134.293 173 134.288L361 133.706C362.657 133.701 364.004 135.04 364.009 136.697ZM299 200.197C299 182.186 313.369 174.697 322 174.697C330.631 174.697 345 182.186 345 200.197C345 218.208 330.631 225.697 322 225.697C313.369 225.697 299 218.208 299 200.197Z"
            fill="white"
          />
          <path
            d="M150.713 147.697L150.344 147.359L149.576 148.197H150.713V147.697ZM264.772 23.2231L265.135 22.8789L264.766 22.49L264.404 22.8853L264.772 23.2231ZM382.894 147.697V148.197H384.057L383.256 147.353L382.894 147.697ZM386 163.697V163.197H385.5V163.697H386ZM400.899 163.697L400.939 163.199L400.919 163.197H400.899V163.697ZM382 306.697L382 306.197L382 306.197L382 306.697ZM376 306.697L376 307.197L376 307.197L376 306.697ZM364 306.697L364 306.197H364V306.697ZM170 306.697L170 306.197L170 306.197L170 306.697ZM158 306.697L158 307.197L158 307.197L158 306.697ZM152 306.697L152 306.197H152V306.697ZM148 261.697H148.5V261.197H148V261.697ZM27.591 261.676L27.5405 262.174L27.5406 262.174L27.591 261.676ZM24 257.697L23.5 257.697L23.5 257.698L24 257.697ZM24 169.697H24.5V169.197H24V169.697ZM1.31434 167.254L1.77484 167.059L1.77484 167.059L1.31434 167.254ZM4.59102 42.7178L4.64154 43.2152L4.64154 43.2152L4.59102 42.7178ZM223.151 42.6971V43.1971H223.371L223.519 43.0349L223.151 42.6971ZM255.963 6.88898L256.332 7.22678L256.389 7.16449L256.422 7.08691L255.963 6.88898ZM257.803 4.25713L257.459 3.89444L257.459 3.89445L257.803 4.25713ZM258.913 3.20393L259.257 3.56662L259.257 3.56662L258.913 3.20393ZM264.53 1.00768L264.523 1.50763L264.537 1.50783L264.552 1.5072L264.53 1.00768ZM270.284 3.10183L270.622 2.73319L270.622 2.73319L270.284 3.10183ZM271.412 4.1355L271.75 3.76686L271.75 3.76686L271.412 4.1355ZM273.303 6.74565L272.847 6.95088L272.881 7.02827L272.94 7.08983L273.303 6.74565ZM408.451 149.163L408.088 149.507L408.088 149.507L408.451 149.163ZM408.155 160.472L407.811 160.11L407.811 160.11L408.155 160.472ZM407.045 161.526L407.389 161.888L407.389 161.888L407.045 161.526ZM123.271 151.697V152.197H123.492L123.641 152.033L123.271 151.697ZM123.316 151.648L122.947 151.31L122.946 151.312L123.316 151.648ZM16 151.697H15.5V152.197H16V151.697ZM16 57.6971V57.1971H15.5V57.6971H16ZM209.406 57.6971L209.775 58.0349L210.542 57.1971H209.406V57.6971ZM39 169.697L39 169.197L38.5 169.197V169.697H39ZM39 247.697H38.5V248.197H39V247.697ZM148 169.697H148.5V169.197L148 169.197L148 169.697ZM148 247.697V248.197H148.5V247.697H148ZM170 292.697H169.5V293.197L170 293.197L170 292.697ZM170 163.697V163.197H169.5V163.697H170ZM364 163.697H364.5V163.197H364V163.697ZM364 281.71L363.507 281.791L364.5 281.71H364ZM352.5 271.33H352V271.799L352.468 271.829L352.5 271.33ZM352.5 270.697H353V270.197H352.5V270.697ZM334.271 264.885L334.619 264.526L334.619 264.526L334.271 264.885ZM329.837 243.782L329.388 243.561L329.369 243.601L329.357 243.642L329.837 243.782ZM332.353 238.661L331.946 238.372L331.922 238.405L331.905 238.441L332.353 238.661ZM332.955 237.849L333.351 238.155L333.351 238.155L332.955 237.849ZM342.71 228.118L343.046 228.488L343.055 228.48L343.063 228.472L342.71 228.118ZM342.71 228.118L342.374 227.748L342.365 227.756L342.357 227.764L342.71 228.118ZM345.497 225.578L345.185 225.188L345.172 225.198L345.16 225.209L345.497 225.578ZM286.004 199.697V200.197H286.496L286.504 199.705L286.004 199.697ZM286 199.697V199.197H285.5V199.697H286ZM286 292.697L286 293.197L286.5 293.197V292.697H286ZM347.835 280.501L348.23 280.195L348.096 280.022L347.878 280.003L347.835 280.501ZM327.317 272.071L326.97 272.431L326.97 272.431L327.317 272.071ZM323.658 233.662L324.075 233.939L324.617 233.121L323.637 233.163L323.658 233.662ZM296 223.368L296.348 223.009L295.5 222.185V223.368H296ZM296 292.697H295.5V293.197L296 293.197L296 292.697ZM354.163 292.697L354.163 293.197L354.679 293.197L354.662 292.681L354.163 292.697ZM364 287.416H364.5L363.511 287.311L364 287.416ZM360.689 292.697L360.389 292.297L359.187 293.197H360.689V292.697ZM364 292.697V293.197H364.5V292.697H364ZM261.657 46.8566L262.04 47.1787L262.04 47.1787L261.657 46.8566ZM261.295 42.6295L261.617 42.2471L261.617 42.247L261.295 42.6295ZM228.806 85.8671L229.189 86.1892L229.189 86.1892L228.806 85.8671ZM224.579 86.2294L224.901 85.847L224.901 85.847L224.579 86.2294ZM224.217 82.0023L224.599 82.3244L224.599 82.3244L224.217 82.0023ZM257.068 42.9918L257.45 43.3139L257.45 43.3139L257.068 42.9918ZM234.98 279.097L235.48 279.1L235.48 279.1L234.98 279.097ZM231.961 282.077L231.957 282.577L231.957 282.577L231.961 282.077ZM232 276.077L231.997 276.577L231.997 276.577L232 276.077ZM180 275.736H179.5V276.233L179.997 276.236L180 275.736ZM174 278.371L174.497 278.428L174.5 278.399V278.371H174ZM173.98 278.697L174.48 278.7L174.48 278.7L173.98 278.697ZM176.961 281.717L176.964 281.217L176.964 281.217L176.961 281.717ZM94.04 237.697L93.54 237.703L93.54 237.703L94.04 237.697ZM91.0803 240.737L91.0869 241.237L91.0869 241.237L91.0803 240.737ZM91.0003 234.737L91.0069 235.237L91.0069 235.237L91.0003 234.737ZM51.9997 235.257L52.0064 235.757L52.0064 235.757L51.9997 235.257ZM52.0797 241.257L52.0864 241.756L52.0864 241.756L52.0797 241.257ZM85.962 73.6779L85.9588 74.1779L85.9588 74.1779L85.962 73.6779ZM31.6206 73.3328L31.6237 72.8329L31.1291 72.8297L31.1206 73.3243L31.6206 73.3328ZM86.0001 67.678L85.9969 68.178L85.9969 68.178L86.0001 67.678ZM28.9999 67.3161L28.9968 67.8161L28.9968 67.8161L28.9999 67.3161ZM26.4117 68.7662L26.7869 69.0967L26.8164 69.0631L26.8396 69.0249L26.4117 68.7662ZM25.6646 70.6967L26.1645 70.7052L26.1645 70.7052L25.6646 70.6967ZM25.0511 106.698L25.551 106.706L25.551 106.706L25.0511 106.698ZM27.9996 109.748L28.0081 109.248L27.9996 109.748ZM31.0502 106.8L31.5502 106.808L31.5502 106.808L31.0502 106.8ZM361.019 139.706L361.02 140.206L361.02 140.206L361.019 139.706ZM173.019 140.288L173.02 140.788L173.02 140.788L173.019 140.288ZM170.009 137.297L170.509 137.295L170.509 137.295L170.009 137.297ZM173 134.288L172.998 133.788L172.998 133.788L173 134.288ZM361 133.706L361.002 134.206L361.002 134.206L361 133.706ZM150.713 148.197H170V147.197H150.713V148.197ZM264.404 22.8853L150.344 147.359L151.081 148.035L265.141 23.5609L264.404 22.8853ZM383.256 147.353L265.135 22.8789L264.41 23.5673L382.531 148.041L383.256 147.353ZM364 148.197H382.894V147.197H364V148.197ZM170 148.197H364V147.197H170V148.197ZM386 164.197H400.899V163.197H386V164.197ZM386.5 302.697V163.697H385.5V302.697H386.5ZM382 307.197C384.485 307.197 386.5 305.182 386.5 302.697H385.5C385.5 304.63 383.933 306.197 382 306.197V307.197ZM376 307.197L382 307.197L382 306.197L376 306.197L376 307.197ZM364 307.197L376 307.197L376 306.197L364 306.197L364 307.197ZM170 307.197H364V306.197H170V307.197ZM158 307.197L170 307.197L170 306.197L158 306.197L158 307.197ZM152 307.197L158 307.197L158 306.197L152 306.197L152 307.197ZM147.5 302.697C147.5 305.182 149.515 307.197 152 307.197V306.197C150.067 306.197 148.5 304.63 148.5 302.697H147.5ZM147.5 261.697V302.697H148.5V261.697H147.5ZM39 262.197H148V261.197H39V262.197ZM28 262.197H39V261.197H28V262.197ZM27.5406 262.174C27.6917 262.189 27.845 262.197 28 262.197V261.197C27.8789 261.197 27.7593 261.191 27.6415 261.179L27.5406 262.174ZM23.5 257.698C23.5002 260.028 25.271 261.943 27.5405 262.174L27.6415 261.179C25.8773 261 24.5002 259.509 24.5 257.697L23.5 257.698ZM23.5 257.697V257.697H24.5V257.697H23.5ZM23.5 247.697V257.697H24.5V247.697H23.5ZM23.5 169.697V247.697H24.5V169.697H23.5ZM16 170.197H24V169.197H16V170.197ZM5 170.197H16V169.197H5V170.197ZM0.853838 167.449C1.53655 169.063 3.13525 170.197 5 170.197V169.197C3.55104 169.197 2.30659 168.316 1.77484 167.059L0.853838 167.449ZM0.5 165.697C0.5 166.317 0.625831 166.91 0.853839 167.449L1.77484 167.059C1.59803 166.641 1.5 166.181 1.5 165.697H0.5ZM0.5 151.697V165.697H1.5V151.697H0.5ZM0.5 57.6971V151.697H1.5V57.6971H0.5ZM0.5 46.6971V57.6971H1.5V46.6971H0.5ZM4.5405 42.2203C2.27082 42.4508 0.5 44.3668 0.5 46.6971H1.5C1.5 44.8852 2.87718 43.3944 4.64154 43.2152L4.5405 42.2203ZM5 42.1971C4.84503 42.1971 4.69173 42.205 4.5405 42.2203L4.64154 43.2152C4.75925 43.2032 4.87883 43.1971 5 43.1971V42.1971ZM16 42.1971H5V43.1971H16V42.1971ZM223.151 42.1971H16V43.1971H223.151V42.1971ZM255.594 6.55119L222.782 42.3593L223.519 43.0349L256.332 7.22678L255.594 6.55119ZM257.459 3.89445C256.599 4.71079 255.946 5.66533 255.504 6.69106L256.422 7.08691C256.812 6.18317 257.387 5.34132 258.147 4.61982L257.459 3.89445ZM258.569 2.84124L257.459 3.89444L258.147 4.61982L259.257 3.56662L258.569 2.84124ZM264.537 0.507727C262.397 0.478086 260.244 1.25175 258.569 2.84124L259.257 3.56662C260.735 2.16389 262.634 1.48146 264.523 1.50763L264.537 0.507727ZM270.622 2.73319C268.891 1.14743 266.681 0.413191 264.508 0.508156L264.552 1.5072C266.47 1.42335 268.419 2.07109 269.946 3.47047L270.622 2.73319ZM271.75 3.76686L270.622 2.73319L269.946 3.47047L271.074 4.50414L271.75 3.76686ZM273.759 6.54043C273.298 5.51818 272.627 4.57109 271.75 3.76686L271.074 4.50414C271.85 5.21493 272.441 6.05021 272.847 6.95088L273.759 6.54043ZM408.814 148.818L273.665 6.40148L272.94 7.08983L408.088 149.507L408.814 148.818ZM408.499 160.835C411.904 157.604 412.045 152.224 408.814 148.818L408.088 149.507C410.94 152.511 410.815 157.258 407.811 160.11L408.499 160.835ZM407.389 161.888L408.499 160.835L407.811 160.11L406.701 161.163L407.389 161.888ZM400.859 164.196C403.179 164.381 405.567 163.617 407.389 161.888L406.701 161.163C405.093 162.688 402.988 163.362 400.939 163.199L400.859 164.196ZM123.641 152.033L123.686 151.984L122.946 151.312L122.901 151.361L123.641 152.033ZM39 152.197H123.271V151.197H39V152.197ZM28 152.197H39V151.197H28V152.197ZM16 152.197H28V151.197H16V152.197ZM15.5 57.6971V151.697H16.5V57.6971H15.5ZM209.406 57.1971H16V58.1971H209.406V57.1971ZM123.684 151.986L209.775 58.0349L209.037 57.3593L122.947 151.31L123.684 151.986ZM38.5 169.697V247.697H39.5V169.697H38.5ZM148 169.197L39 169.197L39 170.197L148 170.197L148 169.197ZM148.5 247.697V169.697H147.5V247.697H148.5ZM39 248.197H148V247.197H39V248.197ZM169.5 261.697V292.697H170.5V261.697H169.5ZM169.5 247.697V261.697H170.5V247.697H169.5ZM169.5 163.697V247.697H170.5V163.697H169.5ZM364 163.197H170V164.197H364V163.197ZM364.5 281.71V163.697H363.5V281.71H364.5ZM352.468 271.829C355.125 271.997 357.595 272.768 359.538 274.337C361.474 275.901 362.93 278.293 363.507 281.791L364.493 281.628C363.883 277.923 362.319 275.298 360.166 273.559C358.021 271.827 355.335 271.009 352.532 270.831L352.468 271.829ZM352 270.697V271.33H353V270.697H352ZM333.923 265.244C337.496 268.702 343.367 271.197 352.5 271.197V270.197C343.547 270.197 337.955 267.754 334.619 264.526L333.923 265.244ZM328.5 250.697C328.5 256.825 330.357 261.794 333.923 265.244L334.619 264.526C331.291 261.305 329.5 256.621 329.5 250.697H328.5ZM329.357 243.642C328.782 245.617 328.5 247.886 328.5 250.697H329.5C329.5 247.952 329.776 245.782 330.317 243.922L329.357 243.642ZM331.905 238.441L329.388 243.561L330.286 244.003L332.802 238.882L331.905 238.441ZM332.56 237.544C332.347 237.819 332.142 238.094 331.946 238.372L332.761 238.95C332.949 238.685 333.146 238.42 333.351 238.155L332.56 237.544ZM342.373 227.748C337.956 231.764 334.842 234.592 332.56 237.544L333.351 238.155C335.568 235.288 338.605 232.525 343.046 228.488L342.373 227.748ZM342.356 227.765L342.356 227.765L343.063 228.472L343.064 228.472L342.356 227.765ZM342.357 227.764L342.356 227.765L343.064 228.472L343.064 228.472L342.357 227.764ZM345.16 225.209C344.176 226.11 343.249 226.953 342.374 227.748L343.047 228.488C343.921 227.693 344.85 226.849 345.835 225.947L345.16 225.209ZM357.5 200.197C357.5 210.177 352.733 219.13 345.185 225.188L345.81 225.968C353.574 219.739 358.5 210.508 358.5 200.197H357.5ZM322 167.197C341.641 167.197 357.5 182.005 357.5 200.197H358.5C358.5 181.386 342.124 166.197 322 166.197V167.197ZM286.504 199.705C286.786 181.739 302.537 167.197 322 167.197V166.197C302.057 166.197 285.796 181.113 285.504 199.689L286.504 199.705ZM286 200.197H286.004V199.197H286V200.197ZM286.5 200.197V199.697H285.5V200.197H286.5ZM286.5 292.697V200.197H285.5V292.697H286.5ZM170 293.197L286 293.197L286 292.197L170 292.197L170 293.197ZM347.878 280.003C339.325 279.262 332.526 276.416 327.665 271.712L326.97 272.431C332.031 277.329 339.064 280.243 347.792 280.999L347.878 280.003ZM327.665 271.712C321.952 266.184 319.5 258.653 319.5 250.697H318.5C318.5 258.856 321.018 266.672 326.97 272.431L327.665 271.712ZM319.5 250.697C319.5 243.703 320.973 238.615 324.075 233.939L323.242 233.386C320.014 238.252 318.5 243.54 318.5 250.697H319.5ZM323.637 233.163C323.095 233.186 322.549 233.197 322 233.197V234.197C322.563 234.197 323.123 234.185 323.679 234.162L323.637 233.163ZM322 233.197C311.909 233.197 302.808 229.284 296.348 223.009L295.652 223.726C302.298 230.183 311.649 234.197 322 234.197V233.197ZM295.5 223.368V292.697H296.5V223.368H295.5ZM296 293.197L354.163 293.197L354.163 292.197L296 292.197L296 293.197ZM354.662 292.681C354.609 291.031 353.776 288.925 352.599 286.762C351.413 284.58 349.839 282.271 348.23 280.195L347.44 280.808C349.026 282.853 350.567 285.117 351.721 287.24C352.885 289.381 353.618 291.312 353.663 292.713L354.662 292.681ZM363.511 287.311C363.02 289.612 361.858 291.198 360.389 292.297L360.988 293.097C362.641 291.861 363.945 290.07 364.489 287.52L363.511 287.311ZM364.5 292.697V287.416H363.5V292.697H364.5ZM360.689 293.197H364V292.197H360.689V293.197ZM262.04 47.1787C263.285 45.7001 263.095 43.4922 261.617 42.2471L260.973 43.012C262.029 43.9013 262.164 45.4785 261.275 46.5346L262.04 47.1787ZM229.189 86.1892L262.04 47.1787L261.275 46.5346L228.424 85.5451L229.189 86.1892ZM224.257 86.6119C225.736 87.857 227.943 87.6678 229.189 86.1892L228.424 85.5451C227.534 86.6012 225.957 86.7364 224.901 85.847L224.257 86.6119ZM223.834 81.6802C222.589 83.1588 222.778 85.3668 224.257 86.6119L224.901 85.847C223.845 84.9576 223.71 83.3805 224.599 82.3244L223.834 81.6802ZM256.685 42.6698L223.834 81.6802L224.599 82.3244L257.45 43.3139L256.685 42.6698ZM261.617 42.247C260.138 41.0019 257.93 41.1912 256.685 42.6698L257.45 43.3139C258.339 42.2578 259.917 42.1226 260.973 43.012L261.617 42.247ZM234.48 279.094C234.471 280.475 233.345 281.586 231.964 281.577L231.957 282.577C233.89 282.59 235.468 281.033 235.48 279.1L234.48 279.094ZM231.997 276.577C233.377 276.587 234.489 277.713 234.48 279.094L235.48 279.1C235.493 277.167 233.936 275.59 232.003 275.577L231.997 276.577ZM179.997 276.236L231.997 276.577L232.003 275.577L180.003 275.236L179.997 276.236ZM179.5 250.697V275.736H180.5V250.697H179.5ZM177 248.197C178.381 248.197 179.5 249.316 179.5 250.697H180.5C180.5 248.764 178.933 247.197 177 247.197V248.197ZM174.5 250.697C174.5 249.316 175.619 248.197 177 248.197V247.197C175.067 247.197 173.5 248.764 173.5 250.697H174.5ZM174.5 278.371V250.697H173.5V278.371H174.5ZM174.48 278.7C174.481 278.608 174.486 278.517 174.497 278.428L173.503 278.314C173.489 278.439 173.481 278.565 173.48 278.694L174.48 278.7ZM176.964 281.217C175.583 281.208 174.471 280.081 174.48 278.7L173.48 278.694C173.468 280.627 175.024 282.204 176.957 282.217L176.964 281.217ZM231.964 281.577L176.964 281.217L176.957 282.217L231.957 282.577L231.964 281.577ZM93.54 237.703C93.5584 239.084 92.4542 240.218 91.0736 240.237L91.0869 241.237C93.0197 241.211 94.5657 239.623 94.5399 237.69L93.54 237.703ZM91.0069 235.237C92.3875 235.219 93.5216 236.323 93.54 237.703L94.5399 237.69C94.5142 235.757 92.9264 234.211 90.9936 234.237L91.0069 235.237ZM52.0064 235.757L91.0069 235.237L90.9936 234.237L51.9931 234.757L52.0064 235.757ZM49.5399 238.29C49.5215 236.91 50.6258 235.775 52.0064 235.757L51.9931 234.757C50.0602 234.783 48.5143 236.371 48.54 238.303L49.5399 238.29ZM52.073 240.757C50.6925 240.775 49.5583 239.671 49.5399 238.29L48.54 238.303C48.5658 240.236 50.1536 241.782 52.0864 241.756L52.073 240.757ZM91.0736 240.237L52.073 240.757L52.0864 241.756L91.0869 241.237L91.0736 240.237ZM85.9651 73.1779L31.6237 72.8329L31.6174 73.8328L85.9588 74.1779L85.9651 73.1779ZM88.481 70.6939C88.4722 72.0745 87.3458 73.1867 85.9651 73.1779L85.9588 74.1779C87.8917 74.1902 89.4687 72.6332 89.4809 70.7002L88.481 70.6939ZM85.9969 68.178C87.3776 68.1868 88.4897 69.3132 88.481 70.6939L89.4809 70.7002C89.4932 68.7673 87.9362 67.1903 86.0032 67.1781L85.9969 68.178ZM28.9968 67.8161L85.9969 68.178L86.0032 67.1781L29.0031 66.8161L28.9968 67.8161ZM26.8396 69.0249C27.2811 68.2945 28.0836 67.8103 28.9968 67.8161L29.0031 66.8161C27.7232 66.808 26.6 67.4882 25.9838 68.5076L26.8396 69.0249ZM26.1645 70.7052C26.1751 70.0873 26.4082 69.5267 26.7869 69.0967L26.0364 68.4358C25.5067 69.0373 25.1794 69.8241 25.1647 70.6881L26.1645 70.7052ZM25.551 106.706L26.1645 70.7052L25.1647 70.6881L24.5512 106.689L25.551 106.706ZM28.0081 109.248C26.6276 109.225 25.5275 108.087 25.551 106.706L24.5512 106.689C24.5183 108.622 26.0583 110.215 27.991 110.248L28.0081 109.248ZM30.5503 106.791C30.5268 108.172 29.3886 109.272 28.0081 109.248L27.991 110.248C29.9238 110.281 31.5172 108.741 31.5502 106.808L30.5503 106.791ZM31.1206 73.3243L30.5503 106.791L31.5502 106.808L32.1205 73.3414L31.1206 73.3243ZM361.02 140.206C362.953 140.2 364.515 138.629 364.509 136.696L363.509 136.699C363.514 138.079 362.398 139.202 361.017 139.206L361.02 140.206ZM173.02 140.788L361.02 140.206L361.017 139.206L173.017 139.788L173.02 140.788ZM169.509 137.299C169.515 139.232 171.087 140.794 173.02 140.788L173.017 139.788C171.636 139.792 170.514 138.676 170.509 137.295L169.509 137.299ZM172.998 133.788C171.065 133.794 169.503 135.366 169.509 137.299L170.509 137.295C170.505 135.915 171.621 134.792 173.002 134.788L172.998 133.788ZM360.998 133.206L172.998 133.788L173.002 134.788L361.002 134.206L360.998 133.206ZM364.509 136.696C364.503 134.763 362.931 133.2 360.998 133.206L361.002 134.206C362.382 134.202 363.505 135.318 363.509 136.699L364.509 136.696ZM322 174.197C313.153 174.197 298.5 181.854 298.5 200.197H299.5C299.5 182.519 313.584 175.197 322 175.197V174.197ZM345.5 200.197C345.5 181.854 330.847 174.197 322 174.197V175.197C330.416 175.197 344.5 182.519 344.5 200.197H345.5ZM322 226.197C330.847 226.197 345.5 218.541 345.5 200.197H344.5C344.5 217.875 330.416 225.197 322 225.197V226.197ZM298.5 200.197C298.5 218.541 313.153 226.197 322 226.197V225.197C313.584 225.197 299.5 217.875 299.5 200.197H298.5Z"
            fill="black"
          />
        </svg>
        <div className={style.logo}>
          <h1>EPAIRS</h1>
        </div>
        <a className={style.fq} href="#faq">
          FAQ
        </a>
        <div className={style.menu_number}>
          <a>8 902-667-22-46</a>
        </div>
        <div className={style.header_btn_content}>
          <div className={style.header_block}>
            <a className={style.btn_items} href="#Me">
              О нас 
            </a>
            <button className={style.btn_items}>Отзывы</button>
            <div className="App">
              <RouterProvider router={router} />
            </div>
          </div>
        </div>
      </div>
      <div className={style.header_end}>
        Ремонтно-строительные работы в Ковылкино
      </div>
    </>
  );
};

const Root = (props) => {
  return (
    <>
      <div className={style.header_btn_content}>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <button className={style.btn_items} id={style.btn1}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 463 453"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M312 125C312 169.735 275.735 206 231 206C186.265 206 150 169.735 150 125C150 80.2649 186.265 44 231 44C275.735 44 312 80.2649 312 125ZM307.984 223.488C337.214 200.608 356 164.998 356 125C356 55.9644 300.036 0 231 0C161.964 0 106 55.9644 106 125C106 165.106 124.888 200.801 154.254 223.674C64.3816 245.775 0 305.354 0 375.383C0 454.308 81.7782 453.409 189.66 452.223H189.661C203.232 452.073 217.215 451.92 231.5 451.92C245.785 451.92 259.769 452.073 273.339 452.223H273.34C381.222 453.409 463 454.308 463 375.383C463 305.156 398.254 245.439 307.984 223.488ZM419 375.383C419 388.331 415.622 391.841 414.204 393.213C411.331 395.994 404.089 400.467 386.915 403.758C370.053 406.989 348.4 408.228 321.239 408.457C305.835 408.587 290.755 408.416 274.669 408.233L274.66 408.233C261.232 408.08 247.103 407.92 231.5 407.92C215.897 407.92 201.768 408.08 188.34 408.233L188.331 408.233C172.245 408.416 157.165 408.587 141.761 408.457C114.6 408.228 92.9468 406.989 76.0853 403.758C58.9109 400.467 51.6688 395.994 48.7961 393.213C47.3784 391.841 44 388.331 44 375.383C44 349.4 59.1043 321.25 92.9147 297.753C126.565 274.368 175.426 258.5 231.5 258.5C287.574 258.5 336.435 274.368 370.085 297.753C403.896 321.25 419 349.4 419 375.383Z"
                fill="white"
              />
            </svg>
            Вход
          </button>
        </Link>
        <Link to="/regist" style={{ textDecoration: "none" }}>
          <button className={style.btn_items} id={style.btn2}>
            Регистрация
          </button>
        </Link>
      </div>
      
      <Link to="/client"
        >
      <button className={style.btn_items} id={style.btn3}>
            Admin
        </button>
      </Link>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Header;
