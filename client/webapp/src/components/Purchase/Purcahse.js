import { useEffect, useState } from "react";

const Purchase = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let response = await fetch("http://localhost:5000/purchased",{
            headers:{
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
       response= await response.json()
    //    let {cartId,prchased,purchasedDate} = response
       console.log(response)
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Purchase History</h1>
      {orders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Items</th>
              <th>Total Price</th>
              <th>Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>
                  <ul>
                    {order.items.map((item) => (
                      <li key={item._id}>
                        {item.name} x {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>{new Date(order.purchaseDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No purchase history found.</p>
      )}
    </div>
  );
};

export default Purchase;
