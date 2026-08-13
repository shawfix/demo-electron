import { NavLink } from 'react-router-dom';
import { useTheme } from 'next-themes';

import { routerPath } from '@renderer/router';

const THEME_LABELS: Record<string, string> = {
  light: '明亮',
  dark: '暗黑',
  cupcake: '纸杯蛋糕',
  synthwave: '合成波',
  forest: '森林'
};

function Themes(): React.JSX.Element {
  const { theme, setTheme, themes } = useTheme();
  const currentLabel = THEME_LABELS[theme ?? 'light'] ?? theme;

  return (
    <>
      <section className="card w-full bg-base-100 shadow-md">
        <div className="card-body gap-5">
          <div className="flex items-center justify-between">
            <h1 className="card-title">daisyUI 主题切换演示</h1>
            <label className="swap swap-rotate" title="明暗快速切换">
              <input
                type="checkbox"
                checked={theme === 'dark'}
                onChange={(event): void => setTheme(event.target.checked ? 'dark' : 'light')}
              />
              <svg
                className="swap-on size-8 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
              <svg
                className="swap-off size-8 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
            </label>
          </div>

          <p className="text-base-content/70">
            当前主题为 <span className="badge badge-primary badge-outline">{currentLabel}</span>
            ，选择会持久化到 localStorage 的 <code>app-theme</code>，重启应用后自动恢复。
          </p>

          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-primary w-56">
              主题：{currentLabel}
              <svg
                className="size-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box z-1 w-56 bg-base-100 p-2 shadow-md"
            >
              {themes.map((name) => (
                <li key={name}>
                  <a
                    className={name === theme ? 'active' : ''}
                    onClick={(event): void => {
                      setTheme(name);
                      event.currentTarget.blur();
                    }}
                  >
                    {THEME_LABELS[name] ?? name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="card w-full bg-base-100 shadow-md">
        <div className="card-body gap-5">
          <h2 className="card-title text-lg">语义色组件一览</h2>

          <div className="flex flex-wrap gap-2">
            <button className="btn btn-primary">primary</button>
            <button className="btn btn-secondary">secondary</button>
            <button className="btn btn-accent">accent</button>
            <button className="btn btn-neutral">neutral</button>
            <button className="btn btn-ghost">ghost</button>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="badge badge-primary">primary</span>
            <span className="badge badge-secondary">secondary</span>
            <span className="badge badge-accent">accent</span>
            <span className="badge badge-info">info</span>
            <span className="badge badge-success">success</span>
            <span className="badge badge-warning">warning</span>
            <span className="badge badge-error">error</span>
          </div>

          <div className="alert alert-info">
            <span>info：整套色板随主题即时切换，组件类名无需任何改动。</span>
          </div>
          <div className="alert alert-success">
            <span>success：切换前后只有 data-theme 属性发生变化。</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <input type="toggle" className="toggle toggle-primary" defaultChecked />
            <input type="checkbox" className="checkbox checkbox-primary" defaultChecked />
            <input type="radio" name="demo-radio" className="radio radio-primary" defaultChecked />
            <progress className="progress progress-primary w-40" value={70} max={100} />
          </div>

          <div className="flex gap-2">
            <div className="rounded-box border border-base-300 bg-base-100 p-3 text-sm">
              base-100
            </div>
            <div className="rounded-box bg-base-200 p-3 text-sm">base-200</div>
            <div className="rounded-box bg-base-300 p-3 text-sm">base-300</div>
          </div>
        </div>
      </section>

      <NavLink to={routerPath.index}>
        <button className="btn bg-white text-black border-[#e5e5e5]">To HOME</button>
      </NavLink>
    </>
  );
}

export default Themes;
