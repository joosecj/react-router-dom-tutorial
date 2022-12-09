import { NavLink, Outlet, useSearchParams } from "react-router-dom";
import QueryLink from "../../components/QueryLink";
import QueryNavLink from "../../components/QueryLink";
import { getInvoices } from "../../data";
import './styles.css';

export default function Invoices() {
  const invoices = getInvoices();
  let [searchParams, setSearchParams] = useSearchParams();
  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >

        <input
          value={searchParams.get("name") || ""}
          onChange={(event) => {
            let name = event.target.value;
            if (name) {
              setSearchParams({ name });
            } else {
              setSearchParams({});
            }
          }}
        />

        {invoices
          .filter((invoice) => {
            let name = searchParams.get("name");
            if (!name) {
              return true;
            }
            let invoceName = invoice.name.toLowerCase();
            return invoceName.startsWith(name.toLowerCase());
          })
          .map((invoice) => (
            <QueryLink className={({ isActive }: any) => isActive ? "dblock nav-red" : "dblock nav-blue"}
              to={`/invoices/${invoice.number}`}
              key={invoice.number}
            >
              {invoice.name}
            </QueryLink>
          ))}
      </nav>
      <Outlet />
    </div>
  );
}