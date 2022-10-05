const Route = require("../models/Route");
const handleError = require("../utils/handleError");

exports.addRoute = (req, res) => {
  try {
    const { stops, identifier } = req.body;
    new Route({ stops, identifier })
      .save()
      .then((route) => {
        return res.json({
          success: true,
          route: {
            stops,
            identifier,
            _id: route._id,
          },
        });
      })
      .catch((error) => {
        console.log(error.message);
        res.json({
          success: false,
          errors: handleError(error),
        });
      });
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
};
exports.editRoute = (req, res) => {
  try {
    const { routeId, stops, identifier } = req.body;
    Route.findOne({ _id: routeId, identifier }, (_, route) => {
      if (!route) return res.json({ msg: "route not found" });
      route.stops = stops;
      route.identifier = identifier;
      route.save((error) => {
        if (error) {
          return res.json({
            success: false,
            msg: error.message,
          });
        }
        res.send({ success: true, msg: "Updated successfully !!" });
      });
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
};

exports.deleteRoute = (req, res) => {
  try {
    const { routeId } = req.body;
    if (isMongoId(routeId)) return res.json({ msg: "invalid route id" });
    Route.findByIdAndDelete(routeId, async (err) => {
      if (err) return res.status(500).send({ msg: err.message });
      res.json({
        success: true,
        msg: "bus deleted successfully",
      });
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getRoute = (req, res) => {
  try {
    const { routeId } = req.params;
    Route.findOne(
      {
        _id: routeId,
      },
      (err, route) => {
        if (err) return res.status(500).send(err.message);
        res.json({ success: true, route });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("something went wrong");
  }
};

exports.getRoutes = (req, res) => {
  try {
    const { from, to } = req.body;
    const routes = [];
    // search routes in which, stops consists 'from' and
    // then and then only search for 'to' in that same route,
    // if they are there in sequence, then push them into
    // routes array (local array variable)
    res.json({
      success: false,
      msg: "No direct bus is available for given places.",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("something went wrong");
  }
};
