// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

function addMonthsToDate(date, increment, calendar) {
    let newDate;

	if((calendar || frappe.boot.user.defaults.calendar_type) === 'jalali') {

		newDate = moment(date).add(increment, 'jMonths').subtract(1, 'days');

	} else {

		newDate = moment(date).add(increment, 'months').subtract(1, 'days');

	}

    return newDate.toISOString();
}

frappe.ui.form.on("Fiscal Year", {
	onload: function (frm) {
		if (frm.doc.__islocal) {
			frm.set_value(
				"year_start_date",
				frappe.datetime.add_days(frappe.defaults.get_default("year_end_date"), 1)
			);
		}
	},
	year_start_date: function (frm) {
		if (!frm.doc.is_short_year) {
			let year_end_date=addMonthsToDate(frm.doc.year_start_date, 12);
			frm.set_value("year_end_date", year_end_date);
		}
	},
});
