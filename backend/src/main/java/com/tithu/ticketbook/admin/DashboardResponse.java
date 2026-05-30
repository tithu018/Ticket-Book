package com.tithu.ticketbook.admin;

import com.tithu.ticketbook.show.ShowResponse;
import java.math.BigDecimal;
import java.util.List;

/**
 * Purpose: Response body structure for admin dashboard totals and summaries.
 */
public record DashboardResponse(
        long totalBookings,
        BigDecimal totalRevenue,
        long totalUser,
        List<ShowResponse> activeShows
) {
}
