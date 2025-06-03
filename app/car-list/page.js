"use client";
import Layout from "@/components/layout/Layout";
import { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import CardCard from "@/components/elements/CarCard";
import { getCars } from "@/utils/cars";
import { LanguageContext } from "@/components/translation/translationLayout";
import { FormattedMessage, useIntl } from "react-intl";
import { Skeleton } from "@mui/material";

export default function CarList() {
  const [listing, setListing] = useState([]);
  const [locations, setLocations] = useState([]);
  const [types, setTypes] = useState([]);
  const [search, setSearch] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [isToggled, setToggled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const {
    startDate,
    endDate,
    selectedLocation,
    setSelectedLocation,
    numberOfDays,
  } = useContext(LanguageContext);

  const intl = useIntl();

  useEffect(() => {
    const handleResize = () => {
      setToggled(window.innerWidth >= 992);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchData = async (isNext = false) => {
    setLoading(true);
    const cars = await getCars(
      selectedType,
      12,
      selectedLocation,
      search,
      numberOfDays,
      startDate,
      endDate,
      isNext,
      lastDoc
    );

    if (isNext) {
      setListing((prev) => [...prev, ...cars]);
    } else {
      setListing(cars);
    }

    if (cars.length > 0) {
      setLastDoc(cars[cars.length - 1].createdAt);
    }

    if (cars.length < 6) {
      setIsLastPage(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    setLastDoc(null);
    setIsLastPage(false);
    setListing([]);
    setRefreshTrigger((prev) => prev + 1);
  }, [
    search,
    selectedLocation,
    selectedType,
    numberOfDays,
    startDate,
    endDate,
  ]);

  useEffect(() => {
    fetchData(false);
  }, [refreshTrigger]);

  useEffect(() => {
    const getLocations = async () => {
      const querySnapshot = await getDocs(collection(db, "locations"));
      setLocations(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };

    const getTypes = async () => {
      const querySnapshot = await getDocs(collection(db, "types"));
      setTypes(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };

    getLocations();
    getTypes();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;

      if (scrollBottom && !loading && !isLastPage) {
        fetchData(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, isLastPage, lastDoc]);

  const handleToggle = () => setToggled(!isToggled);

  const handleFilter = (e) => {
    const { name, value } = e.target;
    if (name === "name") setSearch(value);
    else if (name === "location") setSelectedLocation(value);
    else if (name === "type") setSelectedType(value);
  };

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div className="widget-car-listing-list">
        <div className="themesflat-container">
          <div className="row car-listing-list">
            <div className="col-md-12 col-lg-3">
              <div className="search-filter-listing-car">
                <div className="filter-header-list">
                  <h6 className="title-filter">
                    <FormattedMessage
                      id="searchByFilter"
                      defaultMessage="Search by Filter"
                    />
                  </h6>
                  <div className="btn-filter">
                    <i className="icon-Grid-view" onClick={handleToggle} />
                  </div>
                </div>
                <form
                  className="list-filter"
                  style={{ display: isToggled ? "block" : "none" }}
                >
                  <div className="form-group">
                    <div className="input-search-list">
                      <input
                        type="search"
                        className="form-control"
                        placeholder="Search here..."
                        name="name"
                        onChange={handleFilter}
                      />
                      <span className="input-group-text">
                        <i className="icon-Vector-1" />
                      </span>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="group-select">
                      <select
                        className="nice-select"
                        name="location"
                        onChange={handleFilter}
                      >
                        <option value="">
                          <FormattedMessage
                            id="selectLocation"
                            defaultMessage="Select location"
                          />
                        </option>
                        {locations.map((loc) => (
                          <option key={loc.id} value={loc.id}>
                            {intl.locale === "ar"
                              ? loc.name_ar
                              : intl.locale === "en"
                              ? loc.name_en
                              : loc.name_kr}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="group-select">
                      <select
                        className="nice-select"
                        name="type"
                        onChange={handleFilter}
                      >
                        <option value="">
                          <FormattedMessage
                            id="selectType"
                            defaultMessage="Select Type"
                          />
                        </option>
                        {types.map((type) => (
                          <option key={type.id} value={type.id}>
                            {intl.locale === "ar"
                              ? type.name_ar
                              : intl.locale === "en"
                              ? type.name_en
                              : type.name_kr}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-md-12 col-lg-9 listing-list-car-wrap">
              <div className="tab-content" id="nav-listing-car">
                <div className="tab-pane fade show active">
                  <div className="listing-list-car-grid">
                    {loading && !lastDoc ? (
                      [...Array(3)].map((_, index) => (
                        <div key={index} className="listing-grid-item">
                          <div className="listing-item-image">
                            <Skeleton
                              variant="rectangular"
                              width="100%"
                              height={200}
                            />
                          </div>
                          <div className="listing-item-content">
                            <Skeleton variant="text" width="100%" />
                            <Skeleton variant="text" width="80%" />
                          </div>
                        </div>
                      ))
                    ) : listing.length === 0 ? (
                      <h6 className="title-filter">
                        <FormattedMessage
                          id="noCars"
                          defaultMessage="No cars available"
                        />
                      </h6>
                    ) : (
                      listing.map((item) => (
                        <CardCard key={item.id} item={item} />
                      ))
                    )}
                  </div>

                  {/* Bottom loader for pagination */}
                  {loading && lastDoc && (
                    <div style={{ textAlign: "center", padding: "20px" }}>
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
