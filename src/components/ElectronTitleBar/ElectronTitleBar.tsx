import { useEffect, useState } from "react";
import "./ElectronTitleBar.scss";

function ElectronTitleBar() {
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  useEffect(() => {
    const checkMax = async () => {
      try {
        setIsMaximized(await window.elapi.window.isMaximized());
      } catch {}
    };
    checkMax();

    const handleResize = () => checkMax();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className='electron-title-bar row aic jcsb'>
      <span> React Electron Template</span>
      <div className='buttons row aic'>
        <button
          className='button minimize'
          onClick={async () => await window.elapi.window.minimize()}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 24 24'
          >
            <path fill='currentColor' d='M6 21v-2h12v2z' />
          </svg>
        </button>

        {isMaximized ? (
          <button
            className='button unmaximize'
            onClick={async () => await window.elapi.window.unmaximize()}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width={16}
              height={16}
              viewBox='0 0 16 16'
            >
              <path
                fill='currentColor'
                d='M9.8 4H5.27c.193-.334.479-.606.824-.782C6.522 3 7.082 3 8.204 3h1.6c1.12 0 1.68 0 2.11.218c.376.192.682.498.874.874c.218.428.218.988.218 2.11v1.6c0 1.12 0 1.68-.218 2.11a2 2 0 0 1-.782.824v-4.53c0-.577 0-.949-.024-1.23c-.022-.272-.06-.372-.085-.422a1 1 0 0 0-.437-.437c-.05-.025-.15-.063-.422-.085a17 17 0 0 0-1.23-.024z'
              ></path>
              <path
                fill='currentColor'
                fillRule='evenodd'
                d='M3 8.2c0-1.12 0-1.68.218-2.11c.192-.376.498-.682.874-.874c.428-.218.988-.218 2.11-.218h1.6c1.12 0 1.68 0 2.11.218c.376.192.682.498.874.874c.218.428.218.988.218 2.11v1.6c0 1.12 0 1.68-.218 2.11a2 2 0 0 1-.874.874c-.428.218-.988.218-2.11.218h-1.6c-1.12 0-1.68 0-2.11-.218a2 2 0 0 1-.874-.874C3 11.482 3 10.922 3 9.8zM6.2 6h1.6c.577 0 .949 0 1.23.024c.272.022.372.06.422.085c.188.096.341.249.437.437c.025.05.063.15.085.422c.023.283.024.656.024 1.23v1.6c0 .577 0 .949-.024 1.23c-.022.272-.06.372-.085.422a1 1 0 0 1-.437.437c-.05.025-.15.063-.422.085c-.283.023-.656.024-1.23.024H6.2c-.577 0-.949 0-1.23-.024c-.272-.022-.372-.06-.422-.085a1 1 0 0 1-.437-.437c-.025-.05-.063-.15-.085-.422a17 17 0 0 1-.024-1.23v-1.6c0-.577 0-.949.024-1.23c.022-.272.06-.372.085-.422c.096-.188.249-.341.437-.437c.05-.025.15-.063.422-.085C5.253 6 5.626 6 6.2 6'
                clipRule='evenodd'
              ></path>
            </svg>
          </button>
        ) : (
          <button
            className='button maximize'
            onClick={async () => await window.elapi.window.maximize()}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='14'
              height='14'
              viewBox='0 0 24 24'
            >
              <path
                fill='currentColor'
                d='M19 3H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 2v14H5V5z'
              />
            </svg>
          </button>
        )}

        <button
          className='button close'
          onClick={async () => await window.elapi.window.close()}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 24 24'
          >
            <path
              fill='currentColor'
              d='M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z'
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ElectronTitleBar;
