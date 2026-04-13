"use client";
import {
  FaRegCheckCircle,
  FaTruck,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Tracking = ({ trackingData }) => {
  const scans = trackingData?.Shipment;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Your Tracking Details
      </h2>
      <div className="flex flex-col items-center">
        {scans?.map((scan, index) => (
          <div
            key={index}
            className="mb-8 w-full flex flex-col items-start bg-gray-50 p-6 rounded-lg shadow"
          >
            {/* Scan Details */}
            <div className="flex items-center mb-2">
              <FaRegCheckCircle className="text-black mr-2" />
              <span className="text-lg font-medium text-black">
                Status: {scan.Status}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-700 mb-2">
              <FaTruck className="text-gray-400 mr-2" />
              <span>Service: {scan.Service}</span>
            </div>
            <div className="flex items-center text-sm text-gray-700 mb-2">
              <FaCalendarAlt className="text-gray-400 mr-2" />
              <span>Date: {scan.StatusDate}</span>
            </div>
            <div className="flex items-center text-sm text-gray-700 mb-2">
              <FaClock className="text-gray-400 mr-2" />
              <span>Time: {scan.StatusTime}</span>
            </div>
            <div className="text-sm text-gray-700 ">
              {scan.Scans.map((s, i) => (
                <div key={i} className="flex items-center mb-1">
                  <FaMapMarkerAlt className="text-gray-400 mr-2" />
                  <span>Location: {s.ScanDetail.ScannedLocation}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tracking;
