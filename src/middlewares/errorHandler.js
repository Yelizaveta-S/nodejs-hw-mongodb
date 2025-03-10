export const errorHandler = (err, req, res) => {
  console.error('Error:', err);
  
    if (err.status === 404) {
        return res.status(404).json({
            status: 404,
            message: err.message || 'Not Found',
        });
    }

    if (err.status === 400) {
        return res.status(400).json({
            status: 400,
            message: err.message || 'Bad Request',
            data: err.data || null,
        });
    }

    res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message || 'Something went wrong',
        data: err.data || null,
    });
};
