import Query from '../models/Query.js';

// @desc    Public inquiry submission (Quote modal & Contact form)
// @route   POST /api/queries
export const createQuery = async (req, res) => {
  try {
    const { name, email, phone, service, budget, message } = req.body;

    const newQuery = await Query.create({
      name,
      email,
      phone,
      service,
      budget,
      message,
    });

    return res.status(201).json({
      success: true,
      data: newQuery,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all queries with optional status filter
// @route   GET /api/queries
export const getQueries = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status && status !== 'all' ? { status } : {};
    const queries = await Query.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: queries,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update query status (new -> contacted -> closed)
// @route   PUT /api/queries/:id
export const updateQueryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const query = await Query.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!query) {
      return res.status(404).json({ success: false, message: 'Query not found' });
    }

    return res.status(200).json({ success: true, data: query });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete query
// @route   DELETE /api/queries/:id
export const deleteQuery = async (req, res) => {
  try {
    const query = await Query.findByIdAndDelete(req.params.id);
    if (!query) {
      return res.status(404).json({ success: false, message: 'Query not found' });
    }

    return res.status(200).json({ success: true, message: 'Query deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};