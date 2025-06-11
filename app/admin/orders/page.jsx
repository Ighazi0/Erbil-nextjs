"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import {
  Card,
  Table,
  Button,
  Badge,
  Modal,
  Form,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";
import {
  FaEye,
  FaSearch,
  FaCar,
  FaUser,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaClock,
} from "react-icons/fa";
import { format } from "date-fns";
import { useSnackbarContext } from "@/contexts/SnackbarContext";
import LoadingSkeleton from "@/app/admin/models/components/LoadingSkeleton";

function OrderDetailsModal({ show, onHide, order }) {
  if (!order) return null;

  const formatDate = (dateString) => {
    try {
      if (!dateString) return "N/A";
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "N/A";
    }
  };

  const getStatusBadge = (payment, startDate, endDate) => {
    try {
      if (payment.includes("error")) {
        return <Badge bg="danger">Cancelled</Badge>;
      }
      if (payment.includes("pending")) {
        return <Badge bg="info">Pending</Badge>;
      }
      if (!startDate || !endDate) {
        return <Badge bg="secondary">Unknown</Badge>;
      }
      const now = new Date();
      const start = new Date(startDate);
      const end = new Date(endDate);

      const isBefore = now <= start;
      const isAfter = now >= end;

      if (isBefore) {
        return <Badge bg="info">Upcoming</Badge>;
      } else if (isAfter) {
        return <Badge bg="success">Completed</Badge>;
      } else {
        return <Badge bg="warning">Active</Badge>;
      }
    } catch (error) {
      console.error("Error getting status:", error);
      return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      dialogClassName="modal-90w"
      style={{ zIndex: 9999 }}
      contentClassName="shadow-lg"
      backdropClassName="custom-backdrop"
    >
      <style type="text/css">
        {`
                    .custom-backdrop {
                        z-index: 9998 !important;
                    }
                    .modal {
                        z-index: 9999 !important;
                    }
                    .modal-dialog {
                        z-index: 9999 !important;
                    }
                `}
      </style>
      <Modal.Header closeButton className="bg-opacity-10 border-bottom-0 px-4">
        <Modal.Title className="d-flex align-items-center">
          <span
            className="text-primary p-2 rounded-circle me-2 d-flex align-items-center justify-content-center"
            style={{ width: "40px", height: "40px" }}
          >
            <FaCar size={20} />
          </span>
          <div>
            <div className="d-flex align-items-center gap-2">
              <h5 className="mb-0">Order #{order.transactionId}</h5>
              {getStatusBadge(order.payment, order.from, order.to)}
            </div>
            <small className="text-muted">
              Created on {formatDate(order.createdAt)}
            </small>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        className="px-4 py-0"
        style={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        <Row className="g-4 py-4">
          <Col md={6}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <span className="text-white bg-info bg-opacity-10 text-info p-2 rounded me-2">
                    <FaCar />
                  </span>
                  <h6 className="mb-0 text-info">Car Information</h6>
                </div>
                <div className="ps-4">
                  <div className="mb-3">
                    <div className="text-muted mb-1">Vehicle</div>
                    <div className="fw-semibold">
                      {order.carDetails?.brandName}{" "}
                      {order.carDetails?.modelName}
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="text-muted mb-1">Name</div>
                    <div className="fw-semibold">
                      {order.carDetails?.name || "N/A"}
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="text-muted mb-1">Type</div>
                    <div className="fw-semibold">
                      {order.carDetails?.type || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted mb-1">Location</div>
                    <div className="fw-semibold">
                      {order.carDetails?.location || "N/A"}
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <span className="text-white bg-success bg-opacity-10 text-success p-2 rounded me-2">
                    <FaUser />
                  </span>
                  <h6 className="mb-0 text-success">Customer Information</h6>
                </div>
                <div className="ps-4">
                  <div className="mb-3">
                    <div className="text-muted mb-1">Name</div>
                    <div className="fw-semibold">
                      {order.userDetails?.name || "N/A"}
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="text-muted mb-1">Email</div>
                    <div className="fw-semibold">
                      {order.userDetails?.email || "N/A"}
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="text-muted mb-1">Phone</div>
                    <div className="fw-semibold">
                      {order.userDetails?.phone || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted mb-1">Address</div>
                    <div className="fw-semibold">
                      {order.userDetails?.address || "N/A"}
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-4">
                  <span className="text-white bg-warning bg-opacity-10 text-warning p-2 rounded me-2">
                    <FaCalendarAlt />
                  </span>
                  <h6 className="mb-0 text-warning">Rental Details</h6>
                </div>
                <Row className="g-4">
                  <Col md={4}>
                    <div className="p-3 bg-light rounded">
                      <div className="text-muted mb-2">Duration</div>
                      <div className="d-flex align-items-center">
                        <FaClock className="text-primary me-2" />
                        <span className="fw-semibold">{order.days} days</span>
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="p-3 bg-light rounded">
                      <div className="text-muted mb-2">Start Date</div>
                      <div className="d-flex align-items-center">
                        <FaCalendarAlt className="text-success me-2" />
                        <span className="fw-semibold">
                          {formatDate(order.from)}
                        </span>
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="p-3 bg-light rounded">
                      <div className="text-muted mb-2">End Date</div>
                      <div className="d-flex align-items-center">
                        <FaCalendarAlt className="text-danger me-2" />
                        <span className="fw-semibold">
                          {formatDate(order.to)}
                        </span>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="mt-4">
                  <div className="p-3 bg-light rounded mb-3">
                    <div className="text-muted mb-2">Daily Rate</div>
                    <div className="d-flex align-items-center">
                      <FaMoneyBillWave className="text-success me-2" />
                      <span className="fw-semibold">
                        {order.carDetails?.price || 0} AED / day
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-opacity-10 rounded d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <FaMoneyBillWave
                        className="text-primary me-2"
                        size={20}
                      />
                      <span className="text-primary fw-semibold">
                        Total Amount
                      </span>
                    </div>
                    <span className="fw-bold fs-5">{order.totalPrice} AED</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <span className="text-white bg-danger bg-opacity-10 text-danger p-2 rounded me-2">
                    <FaMoneyBillWave />
                  </span>
                  <h6 className="mb-0 text-danger">Payment Information</h6>
                </div>
                <div className="ps-4">
                  <Row className="g-3">
                    <Col md={6}>
                      <div className="mb-3">
                        <div className="text-muted mb-1">Payment Status</div>
                        <div className="fw-semibold">
                          <Badge
                            bg={
                              order.payment === "success"
                                ? "success"
                                : "warning"
                            }
                          >
                            {order.payment || "Pending"}
                          </Badge>
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <div className="text-muted mb-1">Transaction ID</div>
                        <div className="fw-semibold">
                          {order.transactionId || "N/A"}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className="bg-light px-4">
        <Button variant="secondary" onClick={onHide} className="px-4">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { showSnackbar } = useSnackbarContext();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const ordersCollection = collection(db, "orders");
      const ordersSnapshot = await getDocs(ordersCollection);
      const ordersData = await Promise.all(
        ordersSnapshot.docs.map(async (doc) => {
          const data = doc.data();
          const createdAt = data.createdAt?.toDate?.()?.toISOString() || "";
          const from = data.from?.toDate?.()?.toISOString() || "";
          const to = data.to?.toDate?.()?.toISOString() || "";

          // Get car details
          let carDetails = {};
          if (data.car) {
            try {
              const carSnapshot = await getDoc(data.car);
              console.log(carSnapshot.exists());
              if (!carSnapshot.exists()) {
                return;
              }
              const carData = carSnapshot.data();

              let brandName = "";
              if (carData.brand) {
                const brandRef =
                  typeof carData.brand === "string"
                    ? doc(db, carData.brand)
                    : carData.brand;
                const brandSnap = await getDoc(brandRef);
                if (brandSnap.exists()) {
                  brandName = brandSnap.data().name_en;
                }
              }

              let modelName = "";
              if (carData.model) {
                const modelRef =
                  typeof carData.model === "string"
                    ? doc(db, carData.model)
                    : carData.model;
                const modelSnap = await getDoc(modelRef);
                if (modelSnap.exists()) {
                  modelName = modelSnap.data().name_en;
                }
              }

              let typeName = "";
              if (carData.type) {
                const typeRef =
                  typeof carData.type === "string"
                    ? doc(db, carData.type)
                    : carData.type;
                const typeSnap = await getDoc(typeRef);
                if (typeSnap.exists()) {
                  typeName = typeSnap.data().name_en;
                }
              }

              let locationName = "";
              if (carData.location) {
                const locationRef =
                  typeof carData.location === "string"
                    ? doc(db, carData.location)
                    : carData.location;
                const locationSnap = await getDoc(locationRef);
                if (locationSnap.exists()) {
                  locationName = locationSnap.data().name_en;
                }
              }

              carDetails = {
                id: carData.id,
                name: carData.name || "",
                brandName,
                modelName,
                type: typeName,
                location: locationName,
                price:
                  typeof carData.price === "number" ? Number(carData.price) : 0,
                status: carData.status || "unavailable",
                imageUrl: carData.imageUrl || "",
              };
            } catch (error) {
              console.error("Error fetching car details:", error);
            }
          }

          let userDetails = {};
          if (data.user) {
            try {
              const userRef =
                typeof data.user === "string" ? doc(db, data.user) : data.user;
              const userSnap = await getDoc(userRef);
              if (userSnap.exists()) {
                const userData = userSnap.data();
                userDetails = {
                  id: userSnap.id,
                  name: userData.firstName + " " + userData.lastName || "",
                  email: userData.email || "",
                  phone: data.phoneNumber || "",
                  address: userData.address || "",
                };
              }
            } catch (error) {
              console.error("Error fetching user details:", error);
            }
          } else {
            userDetails = {
              name: "Guest",
              phone: data.phoneNumber || "",
            };
          }

          return {
            id: doc.id,
            days: data.days || 0,
            totalPrice: data.totalPrice,
            status: data.status || "pending",
            payment: data.payment || "pending",
            transactionId: data.order_id || "",
            createdAt,
            from,
            to,
            carDetails,
            userDetails,
          };
        })
      );
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
      showSnackbar("Error fetching orders", "error");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      if (!dateString) return "N/A";
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "N/A";
    }
  };

  const getStatusBadge = (payment, startDate, endDate) => {
    try {
      if (payment.includes("error")) {
        return <Badge bg="danger">Cancelled</Badge>;
      }
      if (payment.includes("pending")) {
        return <Badge bg="info">Pending</Badge>;
      }
      if (!startDate || !endDate) {
        return <Badge bg="secondary">Unknown</Badge>;
      }
      const now = new Date();
      const start = new Date(startDate);
      const end = new Date(endDate);

      const isBefore = now <= start;
      const isAfter = now >= end;

      if (isBefore) {
        return <Badge bg="info">Upcoming</Badge>;
      } else if (isAfter) {
        return <Badge bg="success">Completed</Badge>;
      } else {
        return <Badge bg="warning">Active</Badge>;
      }
    } catch (error) {
      console.error("Error getting status:", error);
      return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const filteredOrders = orders.filter((order) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      order.id.toLowerCase().includes(searchLower) ||
      order.carDetails?.name?.toLowerCase().includes(searchLower) ||
      order.carDetails?.brandName?.toLowerCase().includes(searchLower) ||
      order.carDetails?.modelName?.toLowerCase().includes(searchLower) ||
      order.userDetails?.name?.toLowerCase().includes(searchLower) ||
      order.userDetails?.email?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="p-4">
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-white py-3 border-bottom">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <h5 className="mb-1">Orders Management</h5>
              <small className="text-muted">
                Manage and view all rental orders
              </small>
            </div>
            <div style={{ width: "300px" }}>
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0">
                  <FaSearch className="text-muted" />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-start-0 ps-0 py-2"
                />
              </InputGroup>
            </div>
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0">
            <thead>
              <tr className="bg-light">
                <th className="fw-semibold text-primary px-4 py-3">Order ID</th>
                <th className="fw-semibold text-primary py-3">Car</th>
                <th className="fw-semibold text-primary py-3">Customer</th>
                <th className="fw-semibold text-primary py-3">Duration</th>
                <th className="fw-semibold text-primary py-3">Total Amount</th>
                <th className="fw-semibold text-primary py-3">Status</th>
                <th className="fw-semibold text-primary py-3">Created At</th>
                <th className="fw-semibold text-primary text-center py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-5">
                    <div className="text-muted">
                      <FaSearch size={24} className="mb-2" />
                      <div>
                        {searchQuery
                          ? "No orders found matching your search"
                          : "No orders found"}
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="align-middle">
                    <td className="px-4">
                      <div className="d-flex align-items-center">
                        <small className="text-muted">
                          #{order.transactionId}
                        </small>
                      </div>
                    </td>
                    <td>
                      {order.carDetails ? (
                        <div>
                          <div className="fw-semibold text-dark">
                            {order.carDetails.brandName}{" "}
                            {order.carDetails.modelName}
                          </div>
                          <small className="text-muted">
                            {order.carDetails.name}
                          </small>
                        </div>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>
                      {order.userDetails ? (
                        <div>
                          <div className="fw-semibold text-dark">
                            {order.userDetails.name}
                          </div>
                          <small className="text-muted">
                            {order.userDetails.email}
                          </small>
                        </div>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <FaClock className="text-muted me-1" />
                        <span>{order.days || "N/A"} days</span>
                      </div>
                    </td>
                    <td>
                      <div className="fw-semibold">
                        {order.totalPrice ? `${order.totalPrice} AED` : "N/A"}
                      </div>
                    </td>
                    <td>
                      {getStatusBadge(order.payment, order.from, order.to)}
                    </td>
                    <td>{formatDate(order.createdAt)}</td>
                    <td className="text-center">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleViewOrder(order)}
                        className="d-inline-flex align-items-center shadow-sm px-3"
                      >
                        <FaEye className="me-2" />
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <OrderDetailsModal
        show={showModal}
        onHide={() => setShowModal(false)}
        order={selectedOrder}
      />
    </div>
  );
}
